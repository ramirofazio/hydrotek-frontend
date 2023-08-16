import axios from "axios";

const API_URL = "http://localhost:3001"; //Ejemplo --> process.env.APP_API_URL

export const apiHydro = axios.create({
  baseURL: API_URL,
  headers: { "header_name": "header_value" },
});
