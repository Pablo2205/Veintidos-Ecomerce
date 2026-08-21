import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// En producción, vercel.json excluye /demos/ del rewrite de SPA para que
// esas carpetas se sirvan como HTML estático. Este plugin replica ese
// comportamiento en el dev server de Vite.
const serveDemos = {
  name: 'serve-demos',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!req.url?.startsWith('/demos/')) return next()

      const urlPath = req.url.split('?')[0]
      let filePath = path.join(__dirname, 'public', urlPath)

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html')
      }

      if (fs.existsSync(filePath) && filePath.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html')
        return res.end(fs.readFileSync(filePath))
      }

      next()
    })
  },
}

export default defineConfig({
  plugins: [react(), serveDemos],
})
