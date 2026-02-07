'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Clock, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import { MediaPreview } from '@/components/MediaPreview';
import { getThreadMeta } from '@/lib/threadMeta';

interface ThreadCardProps {
    thread: {
        id: string;
        title: string;
        type: string;
        value: string;
        repliesCount: number;
        lastReplyAt: string;
        createdAt?: string;
        hashtags?: string;
        ipns?: string;
        upvotes?: number;
        downvotes?: number;
    };
    idx: number;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({ thread, idx }) => {
    const router = useRouter();
    const [votes, setVotes] = React.useState({
        up: thread.upvotes || 0,
        down: thread.downvotes || 0
    });
    const [isVoting, setIsVoting] = React.useState(false);

    let tags: string[] = [];
    if (thread.hashtags) {
        try {
            tags = JSON.parse(thread.hashtags);
        } catch {
            tags = [];
        }
    }
    const meta = getThreadMeta(thread);
    const ipnsValue = thread.ipns
        ? (thread.ipns.startsWith('http') ? thread.ipns : `ipns://${thread.ipns}`)
        : '';

    const handleVote = async (e: React.MouseEvent, direction: 'up' | 'down') => {
        e.stopPropagation();
        if (isVoting) return;
        setIsVoting(true);
        try {
            const res = await fetch(`/api/threads/${thread.id}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ direction }),
            });
            if (res.ok) {
                const data = await res.json();
                setVotes({ up: data.upvotes, down: data.downvotes });
            }
        } catch (error) {
            console.error('Failed to vote:', error);
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03 }}
            onClick={() => router.push(`/thread/${thread.id}`)}
            className="bg-white p-4 rounded-[24px] pill-shadow border border-white hover:border-metamask-orange transition-all cursor-pointer group flex flex-col h-full"
        >
            <div className="relative">
                <MediaPreview
                    values={[thread.value, ipnsValue]}
                    className="aspect-video rounded-2xl bg-black/5"
                    showPlayIcon
                />
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded">
                    {meta.durationLabel}
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                    <span className="text-[10px] font-black bg-white/90 px-2 py-1 rounded text-metamask-purple/60 uppercase">
                        {thread.type}
                    </span>
                    {thread.ipns && (
                        <span className="text-[10px] font-black bg-metamask-orange text-white px-2 py-1 rounded uppercase">
                            IPNS
                        </span>
                    )}
                </div>
            </div>

            <div className="pt-4 space-y-2 flex-grow">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-black text-metamask-purple line-clamp-2 leading-snug group-hover:text-metamask-orange transition-colors">
                        {thread.title}
                    </h3>
                    <div className="flex flex-col items-center gap-1 bg-metamask-beige/50 p-1.5 rounded-xl min-w-[40px]">
                        <button
                            onClick={(e) => handleVote(e, 'up')}
                            disabled={isVoting}
                            className="text-metamask-purple/40 hover:text-metamask-orange transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                        </button>
                        <span className="text-xs font-black text-metamask-purple">
                            {(votes.up - votes.down)}
                        </span>
                        <button
                            onClick={(e) => handleVote(e, 'down')}
                            disabled={isVoting}
                            className="text-metamask-purple/40 hover:text-blue-500 transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                    </div>
                </div>
                <div className="text-xs font-bold text-metamask-purple/50 flex flex-wrap items-center gap-2">
                    <span>{meta.viewsLabel}</span>
                    <span>•</span>
                    <span>{meta.timeAgo}</span>
                </div>
                <div className="text-xs font-mono text-metamask-purple/40 line-clamp-1">{thread.value}</div>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag: string) => (
                            <span
                                key={tag}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/search?tag=${encodeURIComponent(tag)}`);
                                }}
                                className="text-[10px] font-black text-metamask-orange bg-metamask-orange/5 px-2 py-0.5 rounded-full hover:bg-metamask-orange hover:text-white transition-colors"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-metamask-purple/40">
                <div className="flex items-center gap-1.5 transition-colors group-hover:text-metamask-purple">
                    <MessageSquare size={14} />
                    <span className="text-xs font-bold">{thread.repliesCount || 0}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold uppercase">
                        {new Date(thread.lastReplyAt || thread.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase">
                    <Hash size={12} />
                    {tags.length}
                </div>
            </div>
        </motion.div>
    );
};
