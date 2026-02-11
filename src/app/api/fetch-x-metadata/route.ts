import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Convert x.com/twitter.com to api.vxtwitter.com for easy JSON metadata
        const apiUrl = url
            .replace(/(x|twitter)\.com/, 'api.vxtwitter.com');

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch from vxtwitter');
        }

        const data = await response.json();

        return NextResponse.json({
            text: data.text || '',
            author: data.user_name || '',
            hasVideo: data.media_extended?.some((m: any) => m.type === 'video') || false,
            videoUrl: data.media_extended?.find((m: any) => m.type === 'video')?.url || null,
        });
    } catch (error: any) {
        console.error('X Metadata Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
    }
}
