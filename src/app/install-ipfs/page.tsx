'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Info, ShieldCheck, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/shared';
import { motion } from 'framer-motion';

export default function InstallIpfsPage() {
    return (
        <div className="min-h-screen bg-metamask-beige">
            <header className="sticky top-0 z-30 bg-metamask-beige/90 backdrop-blur border-b border-white/60">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2 font-black text-2xl text-metamask-purple">
                        HASHTUBE
                    </Link>
                    <Link href="/">
                        <Button variant="outline" size="sm" className="gap-2">
                            <ArrowLeft size={16} />
                            Back to Index
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    <section className="text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-metamask-orange/10 text-metamask-orange text-xs font-black uppercase tracking-widest">
                            Built for Web3
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-metamask-purple tracking-tight">
                            Elevate Your Experience with IPFS
                        </h1>
                        <p className="text-xl text-metamask-purple/60 font-medium max-w-2xl mx-auto leading-relaxed">
                            HASHTUBE is powered by the InterPlanetary File System. To fully unlock the power of decentralized content, we recommend installing the IPFS Desktop App.
                        </p>
                        <div className="pt-6">
                            <a
                                href="https://docs.ipfs.tech/install/ipfs-desktop/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" className="gap-3 h-16 px-10 text-xl shadow-xl">
                                    <Download size={24} />
                                    Install IPFS Desktop
                                </Button>
                            </a>
                            <p className="text-xs text-metamask-purple/40 font-bold uppercase tracking-tighter mt-4">
                                Available for Windows, macOS, and Linux
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                        <div className="bg-white p-8 rounded-[40px] pill-shadow border border-white space-y-4">
                            <div className="w-12 h-12 bg-metamask-orange/10 rounded-2xl flex items-center justify-center text-metamask-orange mb-2">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-metamask-purple">What is IPFS? (ELI5)</h3>
                            <p className="text-metamask-purple/70 leading-relaxed font-medium">
                                Imagine the internet is a giant library. Instead of asking for a book by its shelf number (like a web address), you ask for it by its name and what's inside.
                            </p>
                            <p className="text-metamask-purple/70 leading-relaxed font-medium">
                                If someone nearby has a copy of that book, they can give it to you directly. This makes the library much faster and harder to break, because even if the library's main desk is closed, you can still get books from your neighbors.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-[40px] pill-shadow border border-white space-y-6">
                            <h3 className="text-2xl font-black text-metamask-purple flex items-center gap-3">
                                <Info className="text-metamask-orange" />
                                Why run a node?
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-metamask-purple">Support Decentralization</h4>
                                        <p className="text-sm text-metamask-purple/60">By running a node, you help host the content you care about, making the web more resilient.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-metamask-purple">Faster Loading</h4>
                                        <p className="text-sm text-metamask-purple/60">Content can be served directly from your local node or nearby peers instead of distant servers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </main>
        </div>
    );
}
