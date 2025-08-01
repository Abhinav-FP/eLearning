import axios from 'axios';

const API_URL =  process.env.NEXT_PUBLIC_BASE_URL || "https://api.japaneseforme.com/api";


// const API_URL = "https://elearning-backend-nbhf.onrender.com/api/"
function getToken() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('token');
    return data;
  }
  return null;
}

let Api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // "Content-Type": "multipart/form-data",
  }
});

Api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let ApiallowFile = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Content-Type": "multipart/form-data",
  }
});

ApiallowFile.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { Api, ApiallowFile };
