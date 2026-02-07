import { NextResponse } from 'next/server';
import turso from '@/lib/turso';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const result = await turso.execute(`
            SELECT * FROM links 
            WHERE isOp = 1 
            ORDER BY lastReplyAt DESC 
            LIMIT 100
        `);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Fetch threads error:', error);
        return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 });
    }
}
