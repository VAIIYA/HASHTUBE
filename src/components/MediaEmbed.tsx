'use client';

import React, { useState, useEffect } from 'react';
import { useIpfsGateway } from '@/hooks/useIpfsGateway';
import { resolveIpfsUrl } from '@/lib/ipfsGateway';

interface MediaEmbedProps {
    values: string[]; // List of CIDs or URLs to try in order
    className?: string;
    mediaClassName?: string;
    controls?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    showFallback?: boolean;
}

export const MediaEmbed: React.FC<MediaEmbedProps> = ({
    values,
    className = '',
    mediaClassName = '',
    controls = true,
    autoPlay = true,
    muted = true,
    loop = true,
    showFallback = false,
}) => {
    const [mediaType, setMediaType] = useState<'image' | 'video' | 'unknown' | null>(null);
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
            return;
        }

        const value = values[currentIndex];
        if (!value) {
            setCurrentIndex(prev => prev + 1);
            return;
        }

        // Special handling for X.com / Twitter links
        const xMatch = value.match(/^https?:\/\/(x|twitter)\.com\/\w+\/status\/(\d+)/);
        if (xMatch) {
            const tweetId = xMatch[2];
            // Use fxtwitter for embedding - it provides a clean video player via its /i/status/ID/video endpoint or similar
            // However, a simple way is to use an iframe to fxtwitter
            setSrc(`https://fxtwitter.com/i/status/${tweetId}`);
            setMediaType('x-video' as any);
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

    if (!mediaType || mediaType === 'unknown') {
        if (!showFallback) return null;
        return (
            <div className={`rounded-2xl overflow-hidden border border-gray-100 bg-black/5 flex items-center justify-center text-xs font-bold text-metamask-purple/40 ${className}`}>
                No media found
            </div>
        );
    }

    return (
        <div className={`rounded-2xl overflow-hidden border border-gray-100 bg-black/5 flex justify-center items-center ${className}`}>
            {mediaType === 'image' && (
                <img
                    src={src}
                    alt="Embedded content"
                    className={`w-full h-full object-contain ${mediaClassName}`}
                    onError={() => setCurrentIndex(prev => prev + 1)}
                />
            )}
            {mediaType === 'video' && (
                <video
                    src={src}
                    controls={controls}
                    autoPlay={autoPlay}
                    muted={muted}
                    loop={loop}
                    playsInline
                    className={`w-full h-full ${mediaClassName}`}
                    onError={() => setCurrentIndex(prev => prev + 1)}
                />
            )}
            {(mediaType as string) === 'x-video' && (
                <iframe
                    src={src.replace('fxtwitter.com', 'fxtwitter.com')} // Already set above
                    className={`w-full aspect-video border-none ${mediaClassName}`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                />
            )}
        </div>
    );
};
