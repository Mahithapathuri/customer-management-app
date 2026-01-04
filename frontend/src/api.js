const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : "https://customer-backend-abc123.onrender.com";

export default API_BASE;
