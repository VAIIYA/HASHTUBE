import { NextResponse } from 'next/server';
import turso from '@/lib/turso';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { direction } = await request.json();

        if (!['up', 'down'].includes(direction)) {
            return NextResponse.json({ error: 'Invalid vote direction' }, { status: 400 });
        }

        const column = direction === 'up' ? 'upvotes' : 'downvotes';

        await turso.execute({
            sql: `UPDATE links SET ${column} = ${column} + 1 WHERE id = ?`,
            args: [id]
        });

        const result = await turso.execute({
            sql: `SELECT upvotes, downvotes FROM links WHERE id = ?`,
            args: [id]
        });

        return NextResponse.json(result.rows[0], { status: 200 });
    } catch (error: any) {
        console.error('Voting error:', error);
        return NextResponse.json({
            error: 'Failed to vote',
            details: error.message
        }, { status: 500 });
    }
}
