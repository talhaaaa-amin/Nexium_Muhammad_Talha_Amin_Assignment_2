import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const summarizeBlog = async (url) => {
  const res = await axios.post(`${API_BASE}/summarize`, { url });
  return res.data;
};
