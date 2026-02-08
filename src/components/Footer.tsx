'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/shared';
import { useRouter } from 'next/navigation';

export const Footer = () => {
    const [isSyncing, setIsSyncing] = useState(false);
    const router = useRouter();

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const response = await fetch('/api/sync', { method: 'POST' });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                router.refresh();
            } else {
                alert(`Sync failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Sync error:', error);
            alert('Failed to sync with HASHCUBE');
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <footer className="bg-metamask-beige border-t border-white/60 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2">
                    <span className="font-black text-xl text-metamask-purple tracking-tight">HASHTUBE</span>
                    <p className="text-sm text-metamask-purple/50 font-medium max-w-xs">
                        Anonymous decentralized index for IPFS CIDs and magnet links.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-metamask-purple/30">Resources</span>
                        <Link
                            href="/install-ipfs"
                            className="text-sm font-bold text-metamask-purple/70 hover:text-metamask-orange transition-colors"
                        >
                            Install IPFS Desktop App
                        </Link>
                        <a
                            href="https://docs.ipfs.tech/install/ipfs-desktop/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-metamask-purple/70 hover:text-metamask-orange transition-colors"
                        >
                            IPFS Documentation
                        </a>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 mt-2"
                            onClick={handleSync}
                            disabled={isSyncing}
                        >
                            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                            {isSyncing ? 'Syncing...' : 'Sync with HASHCUBE'}
                        </Button>
                    </div>
                </div>

                <div className="text-xs font-bold text-metamask-purple/30 text-center md:text-right">
                    Built for the Decentralized Web<br />
                    VAIIYA © 2026<br />
                    <a
                        href="https://hashcube.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-metamask-orange transition-colors"
                    >
                        Powered by HASHCUBE
                    </a>
                </div>
            </div>
        </footer>
    );
};
