import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:4001",
      },
      "/webhook": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:4001",
      },
      "/image": {
        target: process.env.VITE_IMGPROXY_URL || "http://localhost:8080",
        rewrite(path) {
          const key = path.split("/")[2];
          const bucket = process.env.AWS_BUCKET || "at-first-sight";

          return `/insecure/plain/s3://${bucket}/${key}`;
        },
      },
    },
  },
  plugins: [react()],
});
