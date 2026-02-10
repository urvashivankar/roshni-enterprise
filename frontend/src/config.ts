// Remove trailing slash if present to avoid double slashes
const RAW_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env as any).NEXT_PUBLIC_API_URL ||
    'https://roshni-enterprise.onrender.com';
export const API_BASE_URL = RAW_URL.endsWith('/') ? RAW_URL.slice(0, -1) : RAW_URL;

export const getApiUrl = (endpoint: string) => {
    // Ensure endpoint starts with /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // If API_BASE_URL is set, prefix it. Otherwise use relative path (for proxy)
    return `${API_BASE_URL}${cleanEndpoint}`;
};
