import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    testMatch: ["./src/tests/**/*.test.tsx"],
    globals: true,
  },
});
