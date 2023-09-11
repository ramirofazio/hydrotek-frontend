import axios from "axios";

const API_URL = "http://localhost:3000"; //Ejemplo --> process.env.APP_API_URL

export const apiHydro = axios.create({
  baseURL: API_URL,
  headers: {
    // ? Configuracion las cabeceras CORS
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization",
  },
});


