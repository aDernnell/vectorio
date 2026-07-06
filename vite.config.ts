import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
    root: ".",
    build: {
        copyPublicDir: false,
        lib: {
            name: 'glmath',
            entry: 'src/index.ts',
            formats: ['iife'],
            fileName: (format) => `bundle.${format}.js`,
        },
        emptyOutDir: false,
    }
}));
