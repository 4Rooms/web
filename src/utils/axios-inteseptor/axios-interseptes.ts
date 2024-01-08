import axios from "axios";

const secureApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// interceptor for calls to protected routes
secureApi.interceptors.request.use(
    (config) => {
        const cookies = document.cookie.split('; ');
        const tokenCookie = cookies.find(cookie => cookie.startsWith('4roomToken='));
        const token = tokenCookie ? tokenCookie.split('=')[1] : null;

        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
        },
    (error) => Promise.reject(error)
);

// interceptor for response to protected routes
secureApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

export default secureApi;
