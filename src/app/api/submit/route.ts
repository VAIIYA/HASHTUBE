import { NextResponse } from 'next/server';
import turso from '@/lib/turso';
import crypto from 'crypto';

let schemaReady: Promise<void> | null = null;

async function ensureLinksColumns() {
    if (!schemaReady) {
        schemaReady = (async () => {
            // 1. Create the table if it doesn't exist
            await turso.execute(`
                CREATE TABLE IF NOT EXISTS links (
                    id TEXT PRIMARY KEY,
                    title TEXT NOT NULL,
                    type TEXT NOT NULL CHECK (type IN ('ipfs')),
                    value TEXT NOT NULL,
                    description TEXT,
                    parentId TEXT,
                    isOp INTEGER DEFAULT 1,
                    repliesCount INTEGER DEFAULT 0,
                    lastReplyAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    hashtags TEXT,
                    ipns TEXT,
                    FOREIGN KEY (parentId) REFERENCES links(id)
                );
            `);

            // 2. Ensure indices exist
            await turso.execute(`CREATE INDEX IF NOT EXISTS idx_links_parentId ON links(parentId);`);
            await turso.execute(`CREATE INDEX IF NOT EXISTS idx_links_lastReplyAt ON links(lastReplyAt DESC);`);
            await turso.execute(`CREATE INDEX IF NOT EXISTS idx_links_isOp_lastReplyAt ON links(isOp, lastReplyAt DESC);`);

            // 3. Double check columns just in case the table existed but was old
            const result = await turso.execute(`PRAGMA table_info(links);`);
            const existing = new Set((result.rows as any[]).map((row) => row.name));

            const alters: string[] = [];
            if (!existing.has('hashtags')) {
                alters.push(`ALTER TABLE links ADD COLUMN hashtags TEXT;`);
            }
            if (!existing.has('ipns')) {
                alters.push(`ALTER TABLE links ADD COLUMN ipns TEXT;`);
            }

            for (const sql of alters) {
                await turso.execute(sql);
            }
        })();
    }

    return schemaReady;
}

export async function POST(request: Request) {
    try {
        await ensureLinksColumns();
        const body = await request.json();
        const { title, type, value, description, parentId, hashtags, ipns } = body;

        const id = crypto.randomUUID();
        const linkType = 'ipfs'; // Enforce ipfs
        const now = new Date().toISOString();

        // Process hashtags: max 3, sanitized
        let processedHashtags = null;
        if (Array.isArray(hashtags) && hashtags.length > 0) {
            processedHashtags = JSON.stringify(
                hashtags.slice(0, 3).map((tag: string) => tag.trim().replace(/^#/, '').toLowerCase())
            );
        }

        if (parentId) {
            // It's a reply
            await turso.execute({
                sql: `INSERT INTO links (id, title, type, value, description, parentId, isOp, lastReplyAt, createdAt, updatedAt, hashtags, ipns) 
                      VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?)`,
                args: [id, title || 'Reply', linkType, value || '', description || '', parentId, now, now, now, processedHashtags, ipns || null]
            });

            // Update parent thread
            await turso.execute({
                sql: `UPDATE links SET repliesCount = repliesCount + 1, lastReplyAt = ? WHERE id = ?`,
                args: [now, parentId]
            });

            return NextResponse.json({ id, title: title || 'Reply', type: linkType, value: value || '', description, parentId, hashtags: processedHashtags ? JSON.parse(processedHashtags) : [], ipns }, { status: 201 });
        } else {
            // It's a new thread
            if (!title || !value) {
                return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
            }

            await turso.execute({
                sql: `INSERT INTO links (id, title, type, value, description, isOp, lastReplyAt, createdAt, updatedAt, hashtags, ipns) 
                      VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?)`,
                args: [id, title, linkType, value, description || '', now, now, now, processedHashtags, ipns || null]
            });

            return NextResponse.json({ id, title, type: linkType, value, description, hashtags: processedHashtags ? JSON.parse(processedHashtags) : [], ipns }, { status: 201 });
        }
    } catch (error: any) {
        console.error('Submission error:', error);
        return NextResponse.json({
            error: 'Failed to submit link',
            details: error.message
        }, { status: 500 });
    }
}
