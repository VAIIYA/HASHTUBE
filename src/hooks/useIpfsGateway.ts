'use client';

import { useEffect, useMemo, useState } from 'react';
import {
    DEFAULT_GATEWAY_ID,
    IPFS_GATEWAY_STORAGE_KEY,
    IPFS_GATEWAYS,
    getGatewayById,
} from '@/lib/ipfsGateway';

export function useIpfsGateway() {
    const [gatewayId, setGatewayId] = useState(DEFAULT_GATEWAY_ID);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const stored = window.localStorage.getItem(IPFS_GATEWAY_STORAGE_KEY);
        if (stored) {
            setGatewayId(stored);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(IPFS_GATEWAY_STORAGE_KEY, gatewayId);
    }, [gatewayId]);

    const gateway = useMemo(() => getGatewayById(gatewayId), [gatewayId]);

    return {
        gateway,
        gatewayId,
        setGatewayId,
        gateways: IPFS_GATEWAYS,
    };
}
