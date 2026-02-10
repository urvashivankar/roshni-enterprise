// Fallback to the live Render URL if env var is missing (Safety net)
const PROD_URL = 'https://roshni-enterprise-backend.onrender.com';
const RAW_URL = import.meta.env.VITE_API_URL || PROD_URL;
export const API_BASE_URL = RAW_URL.endsWith('/') ? RAW_URL.slice(0, -1) : RAW_URL;

export const getApiUrl = (endpoint: string) => {
    // Ensure endpoint starts with /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // If API_BASE_URL is set, prefix it. Otherwise use relative path (for proxy)
    return `${API_BASE_URL}${cleanEndpoint}`;
};
