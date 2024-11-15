import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://appmpvc.com.br:3333", // URL da sua API sem HTTPS
        changeOrigin: true, // Ajusta o cabeçalho Host na requisição para corresponder ao target
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove o prefixo /api do caminho
      },
      "/parametros": {
        target: "http://appmpvc.com.br:3333", // URL da sua API sem HTTPS
        changeOrigin: true, // Ajusta o cabeçalho Host na requisição para corresponder ao target
        rewrite: (path) => path.replace(/^\/parametros/, ""), // Remove o prefixo /api do caminho
      },
      "/tabela": {
        target: "http://appmpvc.com.br:3333", // URL da sua API sem HTTPS
        changeOrigin: true, // Ajusta o cabeçalho Host na requisição para corresponder ao target
        rewrite: (path) => path.replace(/^\/tabela/, ""), // Remove o prefixo /api do caminho
      },
      "/carteiraclientes": {
        target: "http://appmpvc.com.br:3333", // URL da sua API sem HTTPS
        changeOrigin: true, // Ajusta o cabeçalho Host na requisição para corresponder ao target
        rewrite: (path) => path.replace(/^\/carteiraclientes/, ""), // Remove o prefixo /api do caminho
      },
      "/rotas": {
        target: "http://appmpvc.com.br:3333",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rotas/, ""), // Certifique-se que remove corretamente o prefixo /rotas
      },  
       "/inserirpedido": {
        target: "http://appmpvc.com.br:3333",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/inserirpedido/, ""), // Certifique-se que remove corretamente o prefixo /rotas
      },
    },
  },
});
