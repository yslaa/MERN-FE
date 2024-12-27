import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "url";
import million from "million/compiler";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "src/state/api/config/.env") });
const srcPath = fileURLToPath(new URL("./src", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), million.vite({ auto: true, mute: true })],
  resolve: {
    alias: {
      "@": srcPath,
      "@assets": `${srcPath}/assets`,
      "@constants": `${srcPath}/constants`,
      "@components": `${srcPath}/components`,
      "@layouts": `${srcPath}/layouts`,
      "@pages": `${srcPath}/pages`,
      "@api": `${srcPath}/state/api/reducer`,
      "@hooks": `${srcPath}/state/hooks`,
      "@utils": `${srcPath}/utils`,
      "@validators": `${srcPath}/validators`,
    },
  },
  server: {
    port: 3000,
    hmr: true,
  },
});
