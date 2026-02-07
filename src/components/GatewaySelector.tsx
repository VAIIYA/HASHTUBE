'use client';

import React from 'react';
import { useIpfsGateway } from '@/hooks/useIpfsGateway';

interface GatewaySelectorProps {
    className?: string;
}

export const GatewaySelector: React.FC<GatewaySelectorProps> = ({ className = '' }) => {
    const { gatewayId, setGatewayId, gateways } = useIpfsGateway();

    return (
        <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-metamask-purple/50 ${className}`}>
            Gateway
            <select
                value={gatewayId}
                onChange={(e) => setGatewayId(e.target.value)}
                className="bg-white border border-gray-200 rounded-pill px-3 py-2 text-xs font-bold text-metamask-purple focus:outline-none focus:ring-2 focus:ring-metamask-orange/50"
            >
                {gateways.map((gateway) => (
                    <option key={gateway.id} value={gateway.id}>
                        {gateway.label}
                    </option>
                ))}
            </select>
        </label>
    );
};
