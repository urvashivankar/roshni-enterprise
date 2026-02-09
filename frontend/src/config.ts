export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (endpoint: string) => {
    // Ensure endpoint starts with /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // If API_BASE_URL is set, prefix it. Otherwise use relative path (for proxy)
    return `${API_BASE_URL}${cleanEndpoint}`;
};
