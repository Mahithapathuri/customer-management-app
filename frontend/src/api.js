const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : import.meta.env.VITE_API_BASE;

export default API_BASE;
