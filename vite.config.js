import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import contactHandler from './api/contact.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-contact-dev-server',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            await contactHandler(req, res)
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  }
})


