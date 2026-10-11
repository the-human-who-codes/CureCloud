import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".");
  // /api goes to the Functions emulator in emulator mode, otherwise to the deployed API.
  const apiProxy =
    env.VITE_USE_EMULATORS === "true"
      ? {
          target: "http://127.0.0.1:5001",
          rewrite: (path) => `/curecloud1/africa-south1/api${path}`,
        }
      : { target: "https://curecloud1.web.app", changeOrigin: true };

  return {
    plugins: [tailwindcss(), react()],
    server: { proxy: { "/api": apiProxy } },
  };
});
