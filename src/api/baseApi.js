import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const apiHydro = axios.create({
  maxBodyLength: 750000000, // hacerlo en post con el header form-data
  baseURL: API_URL,
  headers: {
    // ? Configuracion las cabeceras CORS
    "Access-Control-Allow-Origin": import.meta.env.VITE_ACCESS_URL,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization",
  },
});


