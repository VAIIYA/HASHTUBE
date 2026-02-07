'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquare, Twitter, Play, Clock, Hash } from 'lucide-react';
import { Button, Input } from '@/components/ui/shared';
import { MediaEmbed } from '@/components/MediaEmbed';
import { motion } from 'framer-motion';
import { MediaPreview } from '@/components/MediaPreview';
import { GatewaySelector } from '@/components/GatewaySelector';
import { useIpfsGateway } from '@/hooks/useIpfsGateway';
import { resolveIpfsUrl } from '@/lib/ipfsGateway';
import { getThreadMeta } from '@/lib/threadMeta';

interface Post {
    id: string;
    title: string;
    type: string;
    value: string;
    description?: string;
    repliesCount?: number;
    createdAt: string;
    isOp: boolean;
    hashtags?: string;
    ipns?: string;
    lastReplyAt?: string;
}

export default function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [op, setOp] = useState<Post | null>(null);
    const [replies, setReplies] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [upNext, setUpNext] = useState<Post[]>([]);
    const { gateway } = useIpfsGateway();

    useEffect(() => {
        fetchThread();
        fetchUpNext();
    }, [id]);

    const fetchThread = async () => {
        try {
            const res = await fetch(`/api/threads/${id}`);
            if (res.ok) {
                const data = await res.json();
                setOp(data.op);
                setReplies(data.replies);
            }
        } catch (error) {
            console.error('Error fetching thread:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUpNext = async () => {
        try {
            const res = await fetch('/api/threads');
            if (res.ok) {
                const data = await res.json();
                const list = Array.isArray(data) ? data : [];
                setUpNext(list.filter((item: Post) => item.id !== id).slice(0, 12));
            }
        } catch (error) {
            console.error('Error fetching up next:', error);
        }
    };

    const handleShare = () => {
        if (!op) return;
        const text = encodeURIComponent(`Checkout this on HASHTUBE: ${op.title}`);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    };

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    parentId: id,
                    description: replyText,
                }),
            });

            if (res.ok) {
                setReplyText('');
                fetchThread(); // Refresh thread
            }
        } catch (error) {
            console.error('Reply error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-metamask-beige p-6 flex items-center justify-center">Loading...</div>;
    if (!op) return <div className="min-h-screen bg-metamask-beige p-6 flex items-center justify-center">Thread not found</div>;

    let opTags: string[] = [];
    if (op.hashtags) {
        try {
            opTags = JSON.parse(op.hashtags);
        } catch {
            opTags = [];
        }
    }
    const meta = getThreadMeta(op);
    const ipnsValue = op.ipns
        ? (op.ipns.startsWith('http') ? op.ipns : `ipns://${op.ipns}`)
        : '';
    const ipnsUrl = op.ipns
        ? resolveIpfsUrl(ipnsValue, gateway)
        : '';

    return (
        <div className="min-h-screen bg-metamask-beige">
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-metamask-purple/60 hover:text-metamask-purple font-bold transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to Index
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold bg-metamask-orange/10 text-metamask-orange px-3 py-1 rounded-full uppercase">Anonymous</span>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-metamask-purple/40 hover:text-metamask-orange transition-colors"
                        >
                            <Twitter size={14} />
                            Share on X
                        </button>
                    </div>
                    <GatewaySelector className="flex" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-[28px] pill-shadow border border-white space-y-5"
                        >
                            <div className="space-y-2">
                                <h1 className="text-3xl font-black text-metamask-purple">{op.title}</h1>
                                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-metamask-purple/40">
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={12} />
                                        {new Date(op.createdAt).toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MessageSquare size={12} />
                                        {op.repliesCount || replies.length} replies
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Play size={12} />
                                        {op.type}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span>{meta.viewsLabel}</span>
                                        <span>•</span>
                                        <span>{meta.timeAgo}</span>
                                    </div>
                                </div>
                            </div>

                            <MediaEmbed
                                values={[op.value, ipnsValue]}
                                className="aspect-video"
                                mediaClassName="object-contain"
                                controls
                                autoPlay
                                muted
                                loop
                                showFallback
                            />

                            <div className="text-sm font-mono bg-gray-50 p-4 rounded-xl break-all border border-gray-100">
                                <span className="text-metamask-purple/40 mr-2 uppercase">{op.type}:</span>
                                {op.value}
                            </div>

                            {op.ipns && (
                                <div className="space-y-2">
                                    <div className="text-xs font-black text-metamask-purple/40 uppercase tracking-widest ml-1">IPNS Link</div>
                                    <div className="text-sm font-mono bg-metamask-orange/5 p-4 rounded-xl break-all border border-metamask-orange/10 group relative">
                                        <a
                                            href={ipnsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-metamask-orange hover:underline pr-10 block"
                                        >
                                            {op.ipns}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {op.description && <p className="text-metamask-purple/70 leading-relaxed font-medium">{op.description}</p>}
                            {opTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {opTags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            onClick={() => router.push(`/search?tag=${encodeURIComponent(tag)}`)}
                                            className="text-xs font-black text-metamask-orange bg-metamask-orange/5 px-3 py-1 rounded-full cursor-pointer hover:bg-metamask-orange hover:text-white transition-colors"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="text-xs text-metamask-purple/30 font-bold uppercase tracking-widest pt-4 border-t border-gray-100 flex gap-4">
                                <span>{op.id}</span>
                                {op.lastReplyAt && <span>Updated {new Date(op.lastReplyAt).toLocaleString()}</span>}
                            </div>
                        </motion.div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-metamask-purple font-black uppercase tracking-widest text-xs">
                                <MessageSquare size={14} />
                                Replies
                            </div>

                            <div className="space-y-4">
                                {replies.map((reply, idx) => (
                                    <motion.div
                                        key={reply.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-white/60 backdrop-blur-sm p-6 rounded-[24px] pill-shadow-sm border border-white/50 space-y-2 relative"
                                    >
                                        <div className="absolute left-[-20px] top-6 w-[20px] h-[2px] bg-white/50 hidden md:block" />
                                        <div className="text-sm text-metamask-purple/80 font-medium">{reply.description}</div>
                                        <div className="text-[10px] text-metamask-purple/30 font-bold uppercase tracking-tighter flex gap-3">
                                            <span>{new Date(reply.createdAt).toLocaleString()}</span>
                                            <span>{reply.id}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <form onSubmit={handleReply} className="pt-4 space-y-4">
                                <div className="relative">
                                    <Input
                                        placeholder="Type your reply anonymously..."
                                        className="h-16 pr-32"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Button type="submit" disabled={isSubmitting} className="h-10 gap-2">
                                            <MessageSquare size={18} />
                                            Post Reply
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <aside className="space-y-4">
                        <div className="text-xs font-black uppercase tracking-widest text-metamask-purple/40">Up Next</div>
                        <div className="space-y-4">
                            {upNext.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => router.push(`/thread/${item.id}`)}
                                    className="bg-white p-4 rounded-[20px] pill-shadow border border-white hover:border-metamask-orange transition-all cursor-pointer"
                                >
                                    {(() => {
                                        const nextMeta = getThreadMeta(item);
                                        const nextIpns = item.ipns
                                            ? (item.ipns.startsWith('http') ? item.ipns : `ipns://${item.ipns}`)
                                            : '';
                                        return (
                                            <>
                                                <MediaPreview
                                                    values={[item.value, nextIpns]}
                                                    className="aspect-video rounded-2xl bg-black/5"
                                                    showPlayIcon
                                                />
                                                <div className="pt-3 space-y-1">
                                                    <div className="text-sm font-black text-metamask-purple line-clamp-2">{item.title}</div>
                                                    <div className="text-[10px] text-metamask-purple/40 font-bold uppercase flex items-center gap-2">
                                                        <Hash size={12} />
                                                        {nextMeta.viewsLabel}
                                                    </div>
                                                    <div className="text-[10px] text-metamask-purple/40 font-bold uppercase">
                                                        {nextMeta.durationLabel} • {nextMeta.timeAgo}
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
