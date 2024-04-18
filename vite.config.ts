import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8888,
  },
  build: {
    rollupOptions: {
      treeshake: false,
    },
  },
  resolve: {
    alias: {
      "devextreme/ui": "devextreme/esm/ui",
    },
  },
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  optimizeDeps: {},
});
