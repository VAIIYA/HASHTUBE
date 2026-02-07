import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

let client: ReturnType<typeof createClient> | null = null;

function getClient() {
    if (client) return client;
    if (!url || !authToken) {
        throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment.');
    }
    client = createClient({ url, authToken });
    return client;
}

export const turso = {
    execute: (...args: Parameters<ReturnType<typeof createClient>['execute']>) =>
        getClient().execute(...args),
};

export default turso;
