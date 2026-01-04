const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : "https://YOUR_RENDER_BACKEND_URL.onrender.com";

export default BASE_URL;
 