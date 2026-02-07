(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/ipfsGateway.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_GATEWAY_ID",
    ()=>DEFAULT_GATEWAY_ID,
    "IPFS_GATEWAYS",
    ()=>IPFS_GATEWAYS,
    "IPFS_GATEWAY_STORAGE_KEY",
    ()=>IPFS_GATEWAY_STORAGE_KEY,
    "getGatewayById",
    ()=>getGatewayById,
    "resolveIpfsUrl",
    ()=>resolveIpfsUrl
]);
const IPFS_GATEWAYS = [
    {
        id: 'ipfs-io',
        label: 'ipfs.io',
        ipfsBase: 'https://ipfs.io/ipfs/',
        ipnsBase: 'https://ipfs.io/ipns/'
    },
    {
        id: 'cloudflare',
        label: 'Cloudflare',
        ipfsBase: 'https://cloudflare-ipfs.com/ipfs/',
        ipnsBase: 'https://cloudflare-ipfs.com/ipns/'
    },
    {
        id: 'dweb',
        label: 'dweb.link',
        ipfsBase: 'https://dweb.link/ipfs/',
        ipnsBase: 'https://dweb.link/ipns/'
    },
    {
        id: 'nftstorage',
        label: 'nftstorage.link',
        ipfsBase: 'https://nftstorage.link/ipfs/',
        ipnsBase: 'https://nftstorage.link/ipns/'
    }
];
const DEFAULT_GATEWAY_ID = 'ipfs-io';
const IPFS_GATEWAY_STORAGE_KEY = 'hashtube:ipfs-gateway';
function getGatewayById(id) {
    const match = IPFS_GATEWAYS.find((gateway)=>gateway.id === id);
    return match || IPFS_GATEWAYS[0];
}
function resolveIpfsUrl(value, gateway) {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useIpfsGateway.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIpfsGateway",
    ()=>useIpfsGateway
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ipfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ipfsGateway.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useIpfsGateway() {
    _s();
    const [gatewayId, setGatewayId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ipfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GATEWAY_ID"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIpfsGateway.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const stored = window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ipfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IPFS_GATEWAY_STORAGE_KEY"]);
            if (stored) {
                setGatewayId(stored);
            }
        }
    }["useIpfsGateway.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIpfsGateway.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ipfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IPFS_GATEWAY_STORAGE_KEY"], gatewayId);
        }
    }["useIpfsGateway.useEffect"], [
        gatewayId
    ]);
    const gateway = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useIpfsGateway.useMemo[gateway]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ipfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGatewayById"])(gatewayId)
    }["useIpfsGateway.useMemo[gateway]"], [
        gatewayId
    ]);
    return {
        gateway,
        gatewayId,
        setGatewayId,
        gateways: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ipfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IPFS_GATEWAYS"]
    };
}
_s(useIpfsGateway, "hpHCTdx1bohL0FjGHBSszOjXPHk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MediaPreview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MediaPreview",
    ()=>MediaPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useIpfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useIpfsGateway.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ipfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ipfsGateway.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const MediaPreview = ({ values, className = '', mediaClassName = '', showPlayIcon = true, showFallback = true })=>{
    _s();
    const [mediaType, setMediaType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [src, setSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const { gateway } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useIpfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIpfsGateway"])();
    const valuesKey = (values || []).join('|');
    const gatewayKey = gateway.id;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaPreview.useEffect": ()=>{
            setMediaType(null);
            setSrc('');
            setCurrentIndex(0);
        }
    }["MediaPreview.useEffect"], [
        valuesKey,
        gatewayKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaPreview.useEffect": ()=>{
            if (!values || values.length === 0 || currentIndex >= values.length) {
                setMediaType('none');
                return;
            }
            const value = values[currentIndex];
            if (!value) {
                setCurrentIndex({
                    "MediaPreview.useEffect": (prev)=>prev + 1
                }["MediaPreview.useEffect"]);
                return;
            }
            const gatewayUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ipfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveIpfsUrl"])(value, gateway);
            const checkContentType = {
                "MediaPreview.useEffect.checkContentType": async ()=>{
                    try {
                        const response = await fetch(gatewayUrl, {
                            method: 'HEAD',
                            mode: 'cors'
                        });
                        const contentType = response.headers.get('Content-Type');
                        if (contentType?.startsWith('image/')) {
                            setSrc(gatewayUrl);
                            setMediaType('image');
                        } else if (contentType?.startsWith('video/')) {
                            setSrc(gatewayUrl);
                            setMediaType('video');
                        } else {
                            setCurrentIndex({
                                "MediaPreview.useEffect.checkContentType": (prev)=>prev + 1
                            }["MediaPreview.useEffect.checkContentType"]);
                        }
                    } catch (error) {
                        console.error(`Error checking content type for ${gatewayUrl}:`, error);
                        const ext = gatewayUrl.split('.').pop()?.toLowerCase();
                        if ([
                            'jpg',
                            'jpeg',
                            'png',
                            'gif',
                            'webp',
                            'svg'
                        ].includes(ext || '')) {
                            setSrc(gatewayUrl);
                            setMediaType('image');
                        } else if ([
                            'mp4',
                            'webm',
                            'ogg'
                        ].includes(ext || '')) {
                            setSrc(gatewayUrl);
                            setMediaType('video');
                        } else {
                            setCurrentIndex({
                                "MediaPreview.useEffect.checkContentType": (prev)=>prev + 1
                            }["MediaPreview.useEffect.checkContentType"]);
                        }
                    }
                }
            }["MediaPreview.useEffect.checkContentType"];
            checkContentType();
        }
    }["MediaPreview.useEffect"], [
        valuesKey,
        gatewayKey,
        currentIndex
    ]);
    if (mediaType === null && showFallback) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `bg-black/5 animate-pulse ${className}`
        }, void 0, false, {
            fileName: "[project]/src/components/MediaPreview.tsx",
            lineNumber: 86,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (mediaType === 'none') {
        if (!showFallback) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `bg-black/5 flex items-center justify-center text-xs font-bold text-metamask-purple/40 ${className}`,
            children: "No Preview"
        }, void 0, false, {
            fileName: "[project]/src/components/MediaPreview.tsx",
            lineNumber: 93,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden ${className}`,
        children: [
            mediaType === 'image' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: src,
                alt: "Preview",
                className: `w-full h-full object-cover ${mediaClassName}`,
                loading: "lazy",
                onError: ()=>setCurrentIndex((prev)=>prev + 1)
            }, void 0, false, {
                fileName: "[project]/src/components/MediaPreview.tsx",
                lineNumber: 102,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            mediaType === 'video' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                src: src,
                muted: true,
                loop: true,
                playsInline: true,
                preload: "metadata",
                className: `w-full h-full object-cover ${mediaClassName}`,
                onError: ()=>setCurrentIndex((prev)=>prev + 1)
            }, void 0, false, {
                fileName: "[project]/src/components/MediaPreview.tsx",
                lineNumber: 111,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            showPlayIcon && mediaType === 'video' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 rounded-full bg-black/60 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                        size: 18,
                        className: "text-white ml-0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MediaPreview.tsx",
                        lineNumber: 124,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/MediaPreview.tsx",
                    lineNumber: 123,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/MediaPreview.tsx",
                lineNumber: 122,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MediaPreview.tsx",
        lineNumber: 100,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MediaPreview, "foEq686kwBJOu86sQGRKSgXFyfI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useIpfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIpfsGateway"]
    ];
});
_c = MediaPreview;
var _c;
__turbopack_context__.k.register(_c, "MediaPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/threadMeta.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDuration",
    ()=>formatDuration,
    "formatTimeAgo",
    ()=>formatTimeAgo,
    "formatViews",
    ()=>formatViews,
    "getThreadMeta",
    ()=>getThreadMeta
]);
function hashString(input) {
    let hash = 0;
    for(let i = 0; i < input.length; i += 1){
        hash = hash * 31 + input.charCodeAt(i) >>> 0;
    }
    return hash;
}
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function formatDuration(seconds) {
    const clamped = clamp(seconds, 30, 4 * 60 * 60);
    const hrs = Math.floor(clamped / 3600);
    const mins = Math.floor(clamped % 3600 / 60);
    const secs = clamped % 60;
    if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
function formatViews(views) {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
    if (views >= 1_000) return `${Math.round(views / 100) / 10}K views`;
    return `${Math.max(views, 1)} views`;
}
function formatTimeAgo(dateString) {
    if (!dateString) return 'just now';
    const date = new Date(dateString);
    const diff = Date.now() - date.getTime();
    const seconds = Math.max(Math.floor(diff / 1000), 0);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days >= 30) {
        const months = Math.floor(days / 30);
        return `${months}mo ago`;
    }
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
}
function getThreadMeta(thread) {
    const seed = `${thread.id || ''}${thread.value || ''}`;
    const hash = hashString(seed);
    const durationSeconds = 35 + hash % (45 * 60);
    const viewsBase = 120 + hash % 1_200_000;
    const views = viewsBase + Math.floor(hash % 97 * 31);
    const dateSource = thread.lastReplyAt || thread.createdAt;
    return {
        durationSeconds,
        durationLabel: formatDuration(durationSeconds),
        views,
        viewsLabel: formatViews(views),
        timeAgo: formatTimeAgo(dateSource)
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ThreadCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThreadCard",
    ()=>ThreadCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MediaPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MediaPreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$threadMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/threadMeta.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const ThreadCard = ({ thread, idx })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [votes, setVotes] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        up: thread.upvotes || 0,
        down: thread.downvotes || 0
    });
    const [isVoting, setIsVoting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    let tags = [];
    if (thread.hashtags) {
        try {
            tags = JSON.parse(thread.hashtags);
        } catch  {
            tags = [];
        }
    }
    const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$threadMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThreadMeta"])(thread);
    const ipnsValue = thread.ipns ? thread.ipns.startsWith('http') ? thread.ipns : `ipns://${thread.ipns}` : '';
    const handleVote = async (e, direction)=>{
        e.stopPropagation();
        if (isVoting) return;
        setIsVoting(true);
        try {
            const res = await fetch(`/api/threads/${thread.id}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    direction
                })
            });
            if (res.ok) {
                const data = await res.json();
                setVotes({
                    up: data.upvotes,
                    down: data.downvotes
                });
            }
        } catch (error) {
            console.error('Failed to vote:', error);
        } finally{
            setIsVoting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        transition: {
            delay: idx * 0.03
        },
        onClick: ()=>router.push(`/thread/${thread.id}`),
        className: "bg-white p-4 rounded-[24px] pill-shadow border border-white hover:border-metamask-orange transition-all cursor-pointer group flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MediaPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaPreview"], {
                        values: [
                            thread.value,
                            ipnsValue
                        ],
                        className: "aspect-video rounded-2xl bg-black/5",
                        showPlayIcon: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/ThreadCard.tsx",
                        lineNumber: 78,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded",
                        children: meta.durationLabel
                    }, void 0, false, {
                        fileName: "[project]/src/components/ThreadCard.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 right-3 flex flex-col gap-1 items-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-black bg-white/90 px-2 py-1 rounded text-metamask-purple/60 uppercase",
                                children: thread.type
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 87,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            thread.ipns && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-black bg-metamask-orange text-white px-2 py-1 rounded uppercase",
                                children: "IPNS"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 91,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ThreadCard.tsx",
                        lineNumber: 86,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ThreadCard.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-4 space-y-2 flex-grow",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-start gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-black text-metamask-purple line-clamp-2 leading-snug group-hover:text-metamask-orange transition-colors",
                                children: thread.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 100,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-1 bg-metamask-beige/50 p-1.5 rounded-xl min-w-[40px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: (e)=>handleVote(e, 'up'),
                                        disabled: isVoting,
                                        className: "text-metamask-purple/40 hover:text-metamask-orange transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "18",
                                            height: "18",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "3",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "m18 15-6-6-6 6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ThreadCard.tsx",
                                                lineNumber: 109,
                                                columnNumber: 172
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ThreadCard.tsx",
                                            lineNumber: 109,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ThreadCard.tsx",
                                        lineNumber: 104,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-black text-metamask-purple",
                                        children: votes.up - votes.down
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ThreadCard.tsx",
                                        lineNumber: 111,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: (e)=>handleVote(e, 'down'),
                                        disabled: isVoting,
                                        className: "text-metamask-purple/40 hover:text-blue-500 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "18",
                                            height: "18",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "3",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "m6 9 6 6 6-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ThreadCard.tsx",
                                                lineNumber: 119,
                                                columnNumber: 172
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ThreadCard.tsx",
                                            lineNumber: 119,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ThreadCard.tsx",
                                        lineNumber: 114,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 103,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ThreadCard.tsx",
                        lineNumber: 99,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-bold text-metamask-purple/50 flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: meta.viewsLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 124,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 125,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: meta.timeAgo
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 126,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ThreadCard.tsx",
                        lineNumber: 123,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-mono text-metamask-purple/40 line-clamp-1",
                        children: thread.value
                    }, void 0, false, {
                        fileName: "[project]/src/components/ThreadCard.tsx",
                        lineNumber: 128,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: tags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    router.push(`/search?tag=${encodeURIComponent(tag)}`);
                                },
                                className: "text-[10px] font-black text-metamask-orange bg-metamask-orange/5 px-2 py-0.5 rounded-full hover:bg-metamask-orange hover:text-white transition-colors",
                                children: [
                                    "#",
                                    tag
                                ]
                            }, tag, true, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 132,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ThreadCard.tsx",
                        lineNumber: 130,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ThreadCard.tsx",
                lineNumber: 98,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-metamask-purple/40",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 transition-colors group-hover:text-metamask-purple",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 149,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold",
                                children: thread.repliesCount || 0
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 150,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ThreadCard.tsx",
                        lineNumber: 148,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 153,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold uppercase",
                                children: new Date(thread.lastReplyAt || thread.createdAt || Date.now()).toLocaleDateString()
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 154,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ThreadCard.tsx",
                        lineNumber: 152,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/src/components/ThreadCard.tsx",
                                lineNumber: 159,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            tags.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ThreadCard.tsx",
                        lineNumber: 158,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ThreadCard.tsx",
                lineNumber: 147,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ThreadCard.tsx",
        lineNumber: 70,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ThreadCard, "U//nc2kAfs6Nhi4movbT8LWk4Jk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ThreadCard;
var _c;
__turbopack_context__.k.register(_c, "ThreadCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/GatewaySelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GatewaySelector",
    ()=>GatewaySelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useIpfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useIpfsGateway.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const GatewaySelector = ({ className = '' })=>{
    _s();
    const { gatewayId, setGatewayId, gateways } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useIpfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIpfsGateway"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: `flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-metamask-purple/50 ${className}`,
        children: [
            "Gateway",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: gatewayId,
                onChange: (e)=>setGatewayId(e.target.value),
                className: "bg-white border border-gray-200 rounded-pill px-3 py-2 text-xs font-bold text-metamask-purple focus:outline-none focus:ring-2 focus:ring-metamask-orange/50",
                children: gateways.map((gateway)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: gateway.id,
                        children: gateway.label
                    }, gateway.id, false, {
                        fileName: "[project]/src/components/GatewaySelector.tsx",
                        lineNumber: 22,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/GatewaySelector.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GatewaySelector.tsx",
        lineNumber: 14,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GatewaySelector, "2lwZJ4Y+/hw8kC0vkhzSCNFJLac=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useIpfsGateway$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIpfsGateway"]
    ];
});
_c = GatewaySelector;
var _c;
__turbopack_context__.k.register(_c, "GatewaySelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_7b5406b5._.js.map