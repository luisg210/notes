import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://luisg210.github.io/notes/",
  plugins: [react(), svgrPlugin()],
});