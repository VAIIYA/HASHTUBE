module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/turso.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "turso",
    ()=>turso
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$libsql$2f$client__$5b$external$5d$__$2840$libsql$2f$client$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$29$__ = __turbopack_context__.i("[externals]/@libsql/client [external] (@libsql/client, esm_import, [project]/node_modules/@libsql/client)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$libsql$2f$client__$5b$external$5d$__$2840$libsql$2f$client$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$libsql$2f$client__$5b$external$5d$__$2840$libsql$2f$client$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
let client = null;
function getClient() {
    if (client) return client;
    if (!url || !authToken) {
        throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment.');
    }
    client = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$libsql$2f$client__$5b$external$5d$__$2840$libsql$2f$client$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$29$__["createClient"])({
        url,
        authToken
    });
    return client;
}
const turso = {
    execute: (...args)=>getClient().execute(...args)
};
const __TURBOPACK__default__export__ = turso;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/app/api/submit/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/turso.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
let schemaReady = null;
async function ensureLinksColumns() {
    if (!schemaReady) {
        schemaReady = (async ()=>{
            // 1. Create the table if it doesn't exist
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].execute(`
                CREATE TABLE IF NOT EXISTS links (
                    id TEXT PRIMARY KEY,
                    title TEXT NOT NULL,
                    type TEXT NOT NULL CHECK (type IN ('ipfs')),
                    value TEXT NOT NULL,
                    description TEXT,
                    parentId TEXT,
                    isOp INTEGER DEFAULT 1,
                    repliesCount INTEGER DEFAULT 0,
                    lastReplyAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    hashtags TEXT,
                    ipns TEXT,
                    FOREIGN KEY (parentId) REFERENCES links(id)
                );
            `);
            // 2. Ensure indices exist
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].execute(`CREATE INDEX IF NOT EXISTS idx_links_parentId ON links(parentId);`);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].execute(`CREATE INDEX IF NOT EXISTS idx_links_lastReplyAt ON links(lastReplyAt DESC);`);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].execute(`CREATE INDEX IF NOT EXISTS idx_links_isOp_lastReplyAt ON links(isOp, lastReplyAt DESC);`);
            // 3. Double check columns just in case the table existed but was old
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].execute(`PRAGMA table_info(links);`);
            const existing = new Set(result.rows.map((row)=>row.name));
            const alters = [];
            if (!existing.has('hashtags')) {
                alters.push(`ALTER TABLE links ADD COLUMN hashtags TEXT;`);
            }
            if (!existing.has('ipns')) {
                alters.push(`ALTER TABLE links ADD COLUMN ipns TEXT;`);
            }
            for (const sql of alters){
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].execute(sql);
            }
        })();
    }
    return schemaReady;
}
async function POST(request) {
    try {
        await ensureLinksColumns();
        const body = await request.json();
        const { title, type, value, description, parentId, hashtags, ipns } = body;
        const id = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID();
        const linkType = 'ipfs'; // Enforce ipfs
        const now = new Date().toISOString();
        // Process hashtags: max 3, sanitized
        let processedHashtags = null;
        if (Array.isArray(hashtags) && hashtags.length > 0) {
            processedHashtags = JSON.stringify(hashtags.slice(0, 3).map((tag)=>tag.trim().replace(/^#/, '').toLowerCase()));
        }
        if (parentId) {
            // It's a reply
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].execute({
                sql: `INSERT INTO links (id, title, type, value, description, parentId, isOp, lastReplyAt, createdAt, updatedAt, hashtags, ipns) 
                      VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?)`,
                args: [
                    id,
                    title || 'Reply',
                    linkType,
                    value || '',
                    description || '',
                    parentId,
                    now,
                    now,
                    now,
                    processedHashtags,
                    ipns || null
                ]
            });
            // Update parent thread
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].execute({
                sql: `UPDATE links SET repliesCount = repliesCount + 1, lastReplyAt = ? WHERE id = ?`,
                args: [
                    now,
                    parentId
                ]
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                id,
                title: title || 'Reply',
                type: linkType,
                value: value || '',
                description,
                parentId,
                hashtags: processedHashtags ? JSON.parse(processedHashtags) : [],
                ipns
            }, {
                status: 201
            });
        } else {
            // It's a new thread
            if (!title || !value) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Missing required fields'
                }, {
                    status: 400
                });
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turso$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].execute({
                sql: `INSERT INTO links (id, title, type, value, description, isOp, lastReplyAt, createdAt, updatedAt, hashtags, ipns) 
                      VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?)`,
                args: [
                    id,
                    title,
                    linkType,
                    value,
                    description || '',
                    now,
                    now,
                    now,
                    processedHashtags,
                    ipns || null
                ]
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                id,
                title,
                type: linkType,
                value,
                description,
                hashtags: processedHashtags ? JSON.parse(processedHashtags) : [],
                ipns
            }, {
                status: 201
            });
        }
    } catch (error) {
        console.error('Submission error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to submit link',
            details: error.message
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cac00bf0._.js.map