import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const apiHydro = axios.create({
  maxBodyLength: 750000000,
  baseURL: API_URL,
});
