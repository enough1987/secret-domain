import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export const ReactCompilerConfig = {
  target: '19',
  diagnostic: true,
  enableReactCompiler: true,
  enableReactCompilerDevTools: true,
  enableReactCompilerDevToolsInProd: true,
  enableReactCompilerDevToolsInDev: true,
  enableReactCompilerDevToolsInTest: true,
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
        babel: {
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
        },
    }), 
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    open: true,
    https: false,
    hmr: {
      clientPort: 3000,
      host: '0.0.0.0',
      protocol: 'ws'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    allowedHosts: [
      'ec2-13-60-184-124.eu-north-1.compute.amazonaws.com',
      'localhost'
    ]
  },
})
