type ThreadLike = {
    id?: string;
    value?: string;
    createdAt?: string;
    lastReplyAt?: string;
};

function hashString(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i += 1) {
        hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
    }
    return hash;
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

export function formatDuration(seconds: number) {
    const clamped = clamp(seconds, 30, 4 * 60 * 60);
    const hrs = Math.floor(clamped / 3600);
    const mins = Math.floor((clamped % 3600) / 60);
    const secs = clamped % 60;
    if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatViews(views: number) {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
    if (views >= 1_000) return `${Math.round(views / 100) / 10}K views`;
    return `${Math.max(views, 1)} views`;
}

export function formatTimeAgo(dateString?: string) {
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

export function getThreadMeta(thread: ThreadLike) {
    const seed = `${thread.id || ''}${thread.value || ''}`;
    const hash = hashString(seed);
    const durationSeconds = 35 + (hash % (45 * 60));
    const viewsBase = 120 + (hash % 1_200_000);
    const views = viewsBase + Math.floor((hash % 97) * 31);
    const dateSource = thread.lastReplyAt || thread.createdAt;

    return {
        durationSeconds,
        durationLabel: formatDuration(durationSeconds),
        views,
        viewsLabel: formatViews(views),
        timeAgo: formatTimeAgo(dateSource),
    };
}
