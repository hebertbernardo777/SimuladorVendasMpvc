import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://appmpvc.com.br:3333',  // URL da sua API sem HTTPS
        changeOrigin: true,  // Ajusta o cabeçalho Host na requisição para corresponder ao target
        rewrite: (path) => path.replace(/^\/api/, '')  // Remove o prefixo /api do caminho
      }
    }
  }
})
