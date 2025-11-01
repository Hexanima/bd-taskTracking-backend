import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["**/index.ts"],
    },
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      "@app-domain": path.resolve(__dirname, "./domain"),
    },
  },
});
