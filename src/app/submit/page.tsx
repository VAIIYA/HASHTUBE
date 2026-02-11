'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui/shared';
import { motion } from 'framer-motion';
import { TagInput } from '@/components/TagInput';

export default function SubmitPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        type: 'ipfs',
        value: '',
        description: '',
        hashtags: [] as string[],
        ipns: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Detect X.com links and fetch metadata
    useEffect(() => {
        const isXLink = formData.value.match(/^https?:\/\/(x|twitter)\.com\/\w+\/status\/\d+/);
        if (isXLink && !isFetchingMetadata) {
            handleFetchXMetadata(formData.value);
        }
    }, [formData.value]);

    const handleFetchXMetadata = async (url: string) => {
        setIsFetchingMetadata(true);
        try {
            const res = await fetch('/api/fetch-x-metadata', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.text) {
                    setFormData(prev => ({
                        ...prev,
                        description: data.text,
                        title: prev.title || (data.text.slice(0, 50) + (data.text.length > 50 ? '...' : ''))
                    }));
                }
            }
        } catch (error) {
            console.error('Failed to fetch X metadata:', error);
        } finally {
            setIsFetchingMetadata(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');
        try {
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setStatus('success');
                setTimeout(() => router.push('/'), 2000);
            } else {
                let message = 'Failed to submit. Please try again.';
                try {
                    const data = await res.json();
                    if (data?.error) {
                        message = data.error;
                    } else if (data?.details) {
                        message = data.details;
                    }
                } catch {
                    // ignore parsing errors
                }
                setErrorMessage(message);
                setStatus('error');
            }
        } catch (error) {
            setErrorMessage('Failed to submit. Please try again.');
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
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-black uppercase tracking-wider text-metamask-purple/40 ml-4">
                                    CONTENT URL / CID
                                </label>
                                {isFetchingMetadata && (
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-metamask-orange animate-pulse px-4">
                                        <Loader2 size={12} className="animate-spin" />
                                        FETCHING METADATA...
                                    </div>
                                )}
                            </div>
                            <Input
                                required
                                placeholder="Qm... or https://x.com/..."
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
                                Hashtags (Optional)
                            </label>
                            <TagInput
                                tags={formData.hashtags}
                                onTagsChange={(tags) => setFormData({ ...formData, hashtags: tags })}
                                placeholder="e.g. movies, opensource, docs"
                            />
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
                                {errorMessage || 'Failed to submit. Please try again.'}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full gap-2 h-14"
                            disabled={status === 'loading' || isFetchingMetadata}
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
