import axios from "axios";

// Corrected the environment variable access
const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchCyclones = () => API.get('/cyclones');
export const fetchStats = () => API.get('/stats');
