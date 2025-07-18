// yahan se api calls karay ga axios abhi yahn env ko configure karna hay 
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust based on backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
