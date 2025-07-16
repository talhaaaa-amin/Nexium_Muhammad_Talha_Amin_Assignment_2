// src/lib/api.js
import axios from "axios";

const API_BASE = "https://blog-summariser-backend.onrender.com/api";

export const summarizeBlog = async (url) => {
  const res = await axios.post(`${API_BASE}/summarize`, { url });
  return res.data;
};
