import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { fileURLToPath } from 'url';
import compression from 'vite-plugin-compression';
// import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  base: '/',
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       tenor: ['"Tenor Sans"', 'sans-serif'],
  //       palanquin: ['Palanquin', 'sans-serif'],
  //     },
  //   },
  // },
  plugins: [react(),compression(),
    // tailwindcss(),
  ],

  resolve: {
      alias: {
        "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
      },
    },
    server: {
      host: true,
      port: 5173, // or any port you prefer
    },

    build: {
      rollupOptions: {
        external: ["lodash"],
      },

      cssCodeSplit: true, // Splits CSS for better performance
      minify: 'terser', // Ensures Terser is used
      terserOptions: {
        compress: {
          drop_console: true, // Removes console logs
          drop_debugger: true, // Removes debugger statements
        },
      },
    },
    css: {
      devSourcemap: false, // Removes sourcemaps for production
    },
    
  }
)
