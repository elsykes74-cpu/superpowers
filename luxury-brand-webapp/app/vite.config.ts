import path from "path"
const __dirname = import.meta.dirname
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const isDev = process.env.NODE_ENV !== 'production'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react()]

  if (isDev) {
    const { default: devServer } = await import('@hono/vite-dev-server')
    const { inspectAttr } = await import('plugin-inspect-react-code')
    plugins.unshift(devServer({ entry: 'api/boot.ts', exclude: [/^\/(?!api\/).*$/] }))
    plugins.push(inspectAttr())
  }

  return {
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@contracts": path.resolve(__dirname, "./contracts"),
      "@db": path.resolve(__dirname, "./db"),
      "db": path.resolve(__dirname, "./db"),
    },
  },
  envDir: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    allowedHosts: true,
  },
  }
});
