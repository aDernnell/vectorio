/// <reference types="vitest/config" />
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  root: ".",
  build: {
    copyPublicDir: false,
    lib: {
      name: "glmath",
      entry: "src/index.ts",
      formats: ["iife"],
      fileName: (format) => `bundle.${format}.js`,
    },
    emptyOutDir: false,
  },
  test: {
    root: ".",
    include: ["src/tests/**/*.test.ts"],
    coverage: {
      reporter: [["lcov"], ["json", { file: "coverage.json" }], ["text"]],
      reportsDirectory: "./coverage",
      provider: "v8",
      include: ["src/**"],
      exclude: [
        "**/tests/**",
        "**/index.ts",
        "**/namespace.ts",
      ],
      extensions: [".ts"],
    },
  },
}));
