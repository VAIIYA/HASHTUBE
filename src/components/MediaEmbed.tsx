'use client';

import React, { useState, useEffect } from 'react';

interface MediaEmbedProps {
    values: string[]; // List of CIDs or URLs to try in order
}

export const MediaEmbed: React.FC<MediaEmbedProps> = ({ values }) => {
    const [mediaType, setMediaType] = useState<'image' | 'video' | 'unknown' | null>(null);
    const [src, setSrc] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!values || values.length === 0 || currentIndex >= values.length) {
            return;
        }

        const value = values[currentIndex];
        if (!value) {
            setCurrentIndex(prev => prev + 1);
            return;
        }

        let gatewayUrl = value;
        if (!value.startsWith('http')) {
            gatewayUrl = `https://ipfs.io/ipfs/${value}`;
        }

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
    }, [values, currentIndex]);

    if (!mediaType || mediaType === 'unknown') return null;

    return (
        <div className="mt-4 rounded-2xl overflow-hidden border border-gray-100 bg-black/5 flex justify-center items-center">
            {mediaType === 'image' && (
                <img
                    src={src}
                    alt="Embedded content"
                    className="max-h-[500px] w-auto h-auto object-contain"
                    onError={() => setCurrentIndex(prev => prev + 1)}
                />
            )}
            {mediaType === 'video' && (
                <video
                    src={src}
                    controls
                    autoPlay
                    muted
                    loop
                    className="max-h-[500px] w-full"
                    onError={() => setCurrentIndex(prev => prev + 1)}
                />
            )}
        </div>
    );
};
