export type IpfsGateway = {
    id: string;
    label: string;
    ipfsBase: string;
    ipnsBase: string;
};

export const IPFS_GATEWAYS: IpfsGateway[] = [
    {
        id: 'ipfs-io',
        label: 'ipfs.io',
        ipfsBase: 'https://ipfs.io/ipfs/',
        ipnsBase: 'https://ipfs.io/ipns/',
    },
    {
        id: 'cloudflare',
        label: 'Cloudflare',
        ipfsBase: 'https://cloudflare-ipfs.com/ipfs/',
        ipnsBase: 'https://cloudflare-ipfs.com/ipns/',
    },
    {
        id: 'dweb',
        label: 'dweb.link',
        ipfsBase: 'https://dweb.link/ipfs/',
        ipnsBase: 'https://dweb.link/ipns/',
    },
    {
        id: 'nftstorage',
        label: 'nftstorage.link',
        ipfsBase: 'https://nftstorage.link/ipfs/',
        ipnsBase: 'https://nftstorage.link/ipns/',
    },
];

export const DEFAULT_GATEWAY_ID = 'ipfs-io';
export const IPFS_GATEWAY_STORAGE_KEY = 'hashtube:ipfs-gateway';

export function getGatewayById(id?: string | null): IpfsGateway {
    const match = IPFS_GATEWAYS.find((gateway) => gateway.id === id);
    return match || IPFS_GATEWAYS[0];
}

export function resolveIpfsUrl(value: string, gateway: IpfsGateway): string {
    if (!value) return '';
    const trimmed = value.trim();

    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
    }

    if (trimmed.startsWith('ipns://')) {
        return `${gateway.ipnsBase}${trimmed.replace('ipns://', '')}`;
    }

    if (trimmed.startsWith('ipns:')) {
        return `${gateway.ipnsBase}${trimmed.replace('ipns:', '')}`;
    }

    if (trimmed.startsWith('ipns/')) {
        return `${gateway.ipnsBase}${trimmed.replace('ipns/', '')}`;
    }

    if (trimmed.startsWith('ipfs://')) {
        return `${gateway.ipfsBase}${trimmed.replace('ipfs://', '')}`;
    }

    if (trimmed.startsWith('ipfs/')) {
        return `${gateway.ipfsBase}${trimmed.replace('ipfs/', '')}`;
    }

    return `${gateway.ipfsBase}${trimmed}`;
}
