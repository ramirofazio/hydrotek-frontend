import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      pages: "/src/pages",
      //? Agregar alias y ruta aca. Tambien agregar en jsconfig.json para intelisense!!
    },
  },
});
