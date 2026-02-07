'use client';

import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { useIpfsGateway } from '@/hooks/useIpfsGateway';
import { resolveIpfsUrl } from '@/lib/ipfsGateway';

type MediaType = 'image' | 'video' | 'none' | null;

interface MediaPreviewProps {
    values: string[];
    className?: string;
    mediaClassName?: string;
    showPlayIcon?: boolean;
    showFallback?: boolean;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
    values,
    className = '',
    mediaClassName = '',
    showPlayIcon = true,
    showFallback = true,
}) => {
    const [mediaType, setMediaType] = useState<MediaType>(null);
    const [src, setSrc] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const { gateway } = useIpfsGateway();
    const valuesKey = (values || []).join('|');
    const gatewayKey = gateway.id;

    useEffect(() => {
        setMediaType(null);
        setSrc('');
        setCurrentIndex(0);
    }, [valuesKey, gatewayKey]);

    useEffect(() => {
        if (!values || values.length === 0 || currentIndex >= values.length) {
            setMediaType('none');
            return;
        }

        const value = values[currentIndex];
        if (!value) {
            setCurrentIndex(prev => prev + 1);
            return;
        }

        const gatewayUrl = resolveIpfsUrl(value, gateway);

        const checkContentType = async () => {
            try {
                const response = await fetch(gatewayUrl, { method: 'HEAD', mode: 'cors' });
                const contentType = response.headers.get('Content-Type');

                if (contentType?.startsWith('image/')) {
                    setSrc(gatewayUrl);
                    setMediaType('image');
                } else if (contentType?.startsWith('video/')) {
                    setSrc(gatewayUrl);
                    setMediaType('video');
                } else {
                    setCurrentIndex(prev => prev + 1);
                }
            } catch (error) {
                console.error(`Error checking content type for ${gatewayUrl}:`, error);
                const ext = gatewayUrl.split('.').pop()?.toLowerCase();
                if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
                    setSrc(gatewayUrl);
                    setMediaType('image');
                } else if (['mp4', 'webm', 'ogg'].includes(ext || '')) {
                    setSrc(gatewayUrl);
                    setMediaType('video');
                } else {
                    setCurrentIndex(prev => prev + 1);
                }
            }
        };

        checkContentType();
    }, [valuesKey, gatewayKey, currentIndex]);

    if (mediaType === null && showFallback) {
        return (
            <div className={`bg-black/5 animate-pulse ${className}`} />
        );
    }

    if (mediaType === 'none') {
        if (!showFallback) return null;
        return (
            <div className={`bg-black/5 flex items-center justify-center text-xs font-bold text-metamask-purple/40 ${className}`}>
                No Preview
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {mediaType === 'image' && (
                <img
                    src={src}
                    alt="Preview"
                    className={`w-full h-full object-cover ${mediaClassName}`}
                    loading="lazy"
                    onError={() => setCurrentIndex(prev => prev + 1)}
                />
            )}
            {mediaType === 'video' && (
                <video
                    src={src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className={`w-full h-full object-cover ${mediaClassName}`}
                    onError={() => setCurrentIndex(prev => prev + 1)}
                />
            )}
            {showPlayIcon && mediaType === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center">
                        <Play size={18} className="text-white ml-0.5" />
                    </div>
                </div>
            )}
        </div>
    );
};
