import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Home, Flame, Clock, Hash, PlusCircle } from 'lucide-react';
import { Button, Input } from '@/components/ui/shared';
import { ThreadCard } from '@/components/ThreadCard';
import turso from '@/lib/turso';
import { GatewaySelector } from '@/components/GatewaySelector';

export const dynamic = 'force-dynamic';

async function getLatestThreads() {
    try {
        const result = await turso.execute(`
            SELECT * FROM links 
            WHERE isOp = 1 
            ORDER BY createdAt DESC 
            LIMIT 100
        `);
        return result.rows as any[];
    } catch (error) {
        console.error('Error fetching latest videos:', error);
        return [];
    }
}

export default async function LatestPage() {
    const threads = await getLatestThreads();

    return (
        <div className="min-h-screen bg-metamask-beige">
            <header className="sticky top-0 z-30 bg-metamask-beige/90 backdrop-blur border-b border-white/60">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 font-black text-2xl text-metamask-purple">
                        HASHTUBE
                    </Link>
                    <form action="/search" method="get" className="flex-1 max-w-2xl">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                name="q"
                                placeholder="Search IPFS videos, CIDs, IPNS..."
                                className="pl-12 h-12"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <Button type="submit" size="sm">Search</Button>
                            </div>
                        </div>
                    </form>
                    <div className="flex">
                        <GatewaySelector />
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/submit">
                            <Button size="sm" className="gap-2">
                                <PlusCircle size={16} />
                                Post
                            </Button>
                        </Link>
                        <Link href="/hashtags">
                            <Button variant="outline" size="sm">Hashtags</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
                <aside className="hidden lg:block w-56 space-y-3">
                    <Link href="/" className="flex items-center gap-3 text-metamask-purple/80 hover:text-metamask-purple font-bold transition-colors">
                        <Home size={18} />
                        Home
                    </Link>
                    <Link href="/trending" className="flex items-center gap-3 text-metamask-purple/80 hover:text-metamask-purple font-bold transition-colors">
                        <Flame size={18} />
                        Trending
                    </Link>
                    <Link href="/latest" className="flex items-center gap-3 text-metamask-orange font-bold">
                        <Clock size={18} />
                        Latest
                    </Link>
                    <Link href="/hashtags" className="flex items-center gap-3 text-metamask-purple/80 hover:text-metamask-purple font-bold transition-colors">
                        <Hash size={18} />
                        Hashtags
                    </Link>
                    <Link href="/submit" className="flex items-center gap-3 text-metamask-purple/80 hover:text-metamask-purple font-bold transition-colors">
                        <PlusCircle size={18} />
                        Post
                    </Link>
                    <div className="pt-6 text-xs font-bold uppercase tracking-widest text-metamask-purple/30">
                        Anonymous Only
                    </div>
                </aside>

                <main className="flex-1 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="text-xs font-black uppercase tracking-widest text-metamask-purple/40">Global Index</div>
                            <h1 className="text-3xl md:text-4xl font-black text-metamask-purple tracking-tight">Latest Videos</h1>
                        </div>
                        <div className="flex items-center gap-2 text-metamask-purple/40 text-sm font-bold">
                            {threads.length} streams
                            <Link href="/" className="flex items-center gap-2 hover:text-metamask-purple">
                                <ArrowLeft size={16} />
                                Back
                            </Link>
                        </div>
                    </div>

                    {threads.length === 0 ? (
                        <div className="text-center py-20 font-bold text-metamask-purple/40">No videos found in the index.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {threads.map((thread, idx) => (
                                <ThreadCard key={thread.id} thread={thread} idx={idx} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
