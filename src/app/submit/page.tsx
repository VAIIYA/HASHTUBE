'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui/shared';
import { motion } from 'framer-motion';

export default function SubmitPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        type: 'ipfs',
        value: '',
        description: '',
        hashtags: '',
        ipns: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const hashtagsArray = formData.hashtags
                ? formData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
                : [];

            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    hashtags: hashtagsArray,
                }),
            });
            if (res.ok) {
                setStatus('success');
                setTimeout(() => router.push('/'), 2000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-metamask-beige p-6 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-metamask-orange/5 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl bg-white p-10 rounded-[40px] pill-shadow border border-white space-y-8 relative z-10"
            >
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-metamask-purple/60 hover:text-metamask-purple font-bold transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-metamask-purple">Add to HASHTUBE</h1>
                    <p className="text-metamask-purple/50 font-medium">Anonymously submit links to the decentralized index.</p>
                </div>

                {status === 'success' ? (
                    <div className="py-12 text-center space-y-4">
                        <div className="flex justify-center text-green-500">
                            <CheckCircle2 size={64} />
                        </div>
                        <h2 className="text-2xl font-bold text-metamask-purple">Submission Successful!</h2>
                        <p className="text-metamask-purple/60">Redirecting you to the home page...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-wider text-metamask-purple/40 ml-4">Title</label>
                            <Input
                                required
                                placeholder="Name of the file/content"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-wider text-metamask-purple/40 ml-4">
                                IPFS CONTENT HASH CID
                            </label>
                            <Input
                                required
                                placeholder="Qm... or bafy..."
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-wider text-metamask-purple/40 ml-4">
                                IPNS (Optional)
                            </label>
                            <Input
                                placeholder="k51... or ipns://..."
                                value={formData.ipns}
                                onChange={(e) => setFormData({ ...formData, ipns: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-wider text-metamask-purple/40 ml-4">
                                Hashtags (Optional, max 3)
                            </label>
                            <Input
                                placeholder="e.g. movies, opensource, docs"
                                value={formData.hashtags}
                                onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                            />
                            <p className="text-[10px] text-metamask-purple/30 ml-4 italic">Separate hashtags with commas.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-wider text-metamask-purple/40 ml-4">Description (Optional)</label>
                            <Textarea
                                placeholder="Briefly describe what this is..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-2xl text-sm font-bold">
                                <AlertCircle size={18} />
                                Failed to submit. Please try again.
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full gap-2 h-14"
                            disabled={status === 'loading'}
                        >
                            <Send size={20} />
                            {status === 'loading' ? 'Processing...' : 'Submit Anonymously'}
                        </Button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
