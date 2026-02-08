import { NextResponse } from 'next/server';
import turso from '@/lib/turso';

export const dynamic = 'force-dynamic';

async function ensureLinksColumns() {
    // Check if columns exist
    const result = await turso.execute(`PRAGMA table_info(links);`);
    const existing = new Set((result.rows as any[]).map((row) => row.name));

    const alters: string[] = [];
    if (!existing.has('hashtags')) {
        alters.push(`ALTER TABLE links ADD COLUMN hashtags TEXT;`);
    }
    if (!existing.has('ipns')) {
        alters.push(`ALTER TABLE links ADD COLUMN ipns TEXT;`);
    }
    if (!existing.has('upvotes')) {
        alters.push(`ALTER TABLE links ADD COLUMN upvotes INTEGER DEFAULT 0;`);
    }
    if (!existing.has('downvotes')) {
        alters.push(`ALTER TABLE links ADD COLUMN downvotes INTEGER DEFAULT 0;`);
    }

    for (const sql of alters) {
        await turso.execute(sql);
    }
}

async function performSync() {
    await ensureLinksColumns();

    // 1. Fetch threads from HASHCUBE
    const response = await fetch('https://hashcube.vercel.app/api/threads');
    if (!response.ok) {
        throw new Error(`Failed to fetch from HASHCUBE: ${response.statusText}`);
    }

    const externalThreads = await response.json();

    if (!Array.isArray(externalThreads)) {
        throw new Error('Invalid response format from HASHCUBE');
    }

    // 2. Get existing thread IDs to avoid duplicates
    const existingResult = await turso.execute('SELECT id FROM links');
    const existingIds = new Set(existingResult.rows.map(row => row.id));

    // 3. Filter for new threads
    const newThreads = externalThreads.filter(thread => !existingIds.has(thread.id));

    if (newThreads.length === 0) {
        return { message: 'No new threads to sync', count: 0 };
    }

    // 4. Insert new threads
    let syncedCount = 0;
    for (const thread of newThreads) {
        try {
            const hashtags = Array.isArray(thread.hashtags)
                ? JSON.stringify(thread.hashtags)
                : thread.hashtags;

            await turso.execute({
                sql: `INSERT INTO links (
                    id, title, type, value, description, parentId, isOp, 
                    repliesCount, lastReplyAt, createdAt, updatedAt, hashtags, ipns,
                    upvotes, downvotes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    thread.id,
                    thread.title || 'Untitled',
                    thread.type || 'ipfs',
                    thread.value || '',
                    thread.description || '',
                    thread.parentId || null,
                    thread.isOp !== undefined ? thread.isOp : 1,
                    thread.repliesCount || 0,
                    thread.lastReplyAt || new Date().toISOString(),
                    thread.createdAt || new Date().toISOString(),
                    thread.updatedAt || new Date().toISOString(),
                    hashtags || null,
                    thread.ipns || null,
                    thread.upvotes || 0,
                    thread.downvotes || 0
                ]
            });
            syncedCount++;
        } catch (err) {
            console.error(`Failed to sync thread ${thread.id}:`, err);
        }
    }

    return {
        message: `Successfully synced ${syncedCount} new threads`,
        count: syncedCount
    };
}

export async function GET(request: Request) {
    // Basic security check for Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const result = await performSync();
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Sync error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST() {
    try {
        const result = await performSync();
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Sync error:', error);
        return NextResponse.json({
            error: 'Failed to sync with HASHCUBE',
            details: error.message
        }, { status: 500 });
    }
}
