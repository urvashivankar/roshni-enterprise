// In production, we prefer relative paths to use the Vercel proxy (avoids CORS)
// In development, we use localhost:5000
const RAW_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? '' : 'http://localhost:5000');
export const API_BASE_URL = RAW_URL.endsWith('/') ? RAW_URL.slice(0, -1) : RAW_URL;

export const getApiUrl = (endpoint: string) => {
    // Ensure endpoint starts with /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // If API_BASE_URL is set, prefix it. Otherwise use relative path (for proxy)
    return `${API_BASE_URL}${cleanEndpoint}`;
};
