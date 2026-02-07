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
    };
    idx: number;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({ thread, idx }) => {
    const router = useRouter();
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
                <h3 className="text-lg font-black text-metamask-purple line-clamp-2 leading-snug group-hover:text-metamask-orange transition-colors">
                    {thread.title}
                </h3>
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
                        {tags.length > 3 && (
                            <span className="text-[10px] font-black text-metamask-purple/40 bg-gray-100 px-2 py-0.5 rounded-full">
                                +{tags.length - 3} more
                            </span>
                        )}
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
