import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

type TursoClient = ReturnType<typeof createClient>;
type TursoExecute = TursoClient['execute'];

let client: TursoClient | null = null;

function getClient() {
    if (client) return client;
    if (!url || !authToken) {
        throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment.');
    }
    client = createClient({ url, authToken });
    return client;
}

export const turso: { execute: TursoExecute } = {
    execute: ((...args: Parameters<TursoExecute>) => getClient().execute(...args)) as TursoExecute,
};

export default turso;
