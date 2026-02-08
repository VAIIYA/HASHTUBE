import { NextResponse } from 'next/server';
import turso from '@/lib/turso';

export const dynamic = 'force-dynamic';

export async function POST() {
    try {
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
            return NextResponse.json({ message: 'No new threads to sync', count: 0 });
        }

        // 4. Insert new threads
        // We'll insert them one by one for simplicity and to handle potential schema mismatches gracefully
        let syncedCount = 0;
        for (const thread of newThreads) {
            try {
                // Ensure hashtags are stored as JSON string if they come as array
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

        return NextResponse.json({
            message: `Successfully synced ${syncedCount} new threads`,
            count: syncedCount
        });

    } catch (error: any) {
        console.error('Sync error:', error);
        return NextResponse.json({
            error: 'Failed to sync with HASHCUBE',
            details: error.message
        }, { status: 500 });
    }
}
