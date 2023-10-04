import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiHydro = axios.create({
  baseURL: API_URL,
  headers: {
    // ? Configuracion las cabeceras CORS
    "Access-Control-Allow-Origin": import.meta.env.VITE_ACCESS_URL || "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization",
  },
});
