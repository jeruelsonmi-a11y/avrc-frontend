// API Configuration
// - REACT_APP_API_BASE_URL overrides everything (e.g. .env.local)
// - localhost / 127.0.0.1 → local backend
// - Private LAN IPs (e.g. 192.168.x.x when using "On Your Network" from npm start) → same host :8000
//   (Otherwise the app would wrongly use production API and fields like purchase_date stay empty.)
// - Everything else (deployed site) → production backend

const getApiBaseUrl = () => {
  const envUrl = typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE_URL;
  if (envUrl && String(envUrl).trim()) {
    return String(envUrl).replace(/\/$/, '');
  }

  const h = window.location.hostname;
  if (h === 'localhost' || h === '127.0.0.1') {
    return 'http://localhost:8000';
  }

  const isPrivateLan =
    /^(192\.168\.\d{1,3}\.\d{1,3})$/.test(h) ||
    /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(h) ||
    /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(h);

  if (isPrivateLan) {
    return `http://${h}:8000`;
  }

  return 'https://backend-58cw.onrender.com';
};

export const API_BASE_URL = getApiBaseUrl();

export const WS_BASE_URL = API_BASE_URL.replace(/^http/, 'ws');

export default API_BASE_URL;
