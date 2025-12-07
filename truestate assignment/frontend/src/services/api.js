import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchSales = async (params) => {
  const res = await axios.get(`${API_BASE_URL}/sales`, { params });
  return res.data;
};

export const fetchMeta = async () => {
  const res = await axios.get(`${API_BASE_URL}/sales/meta`);
  return res.data;
};
