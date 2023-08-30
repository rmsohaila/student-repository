// config.js
const API_URL = process.env.NODE_ENV === 'production' ? 'http://localhost:5016/api' : 'http://localhost:5016/api';

export default API_URL;
