
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Conditionally import componentTagger only in development
let componentTagger: any = null;
try {
  if (process.env.NODE_ENV !== 'production') {
    componentTagger = require("lovable-tagger").componentTagger;
  }
} catch (e) {
  // Ignore if lovable-tagger is not available
  console.warn('lovable-tagger not available, skipping...');
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
