import {defineConfig} from 'vite';
import {markdownVitePlugin} from "./markdown-vite-plugin";

export default defineConfig({
  base: '',
  plugins: [
    markdownVitePlugin()
  ]
});
