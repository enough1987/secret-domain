import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { PluginOption, ProxyOptions } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl';
import packageJson from './package.json'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";

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
export default defineConfig(({ mode }) => {
  const backendUrl = 'http://localhost:3001';

  process.stdout.write(`[Vite Config] Mode: ${mode}, backendUrl: ${backendUrl}\n`)

  const proxyConfig: ProxyOptions = {
    target: backendUrl,
    changeOrigin: true,
    secure: false,
    timeout: 5000,
    bypass: (req) => {
      const isApiRequest = req.url?.startsWith('/api/')
      if (!isApiRequest) {
        process.stdout.write(`[Proxy Bypass] Not an API request: ${req.url}\n`)
        return req.url
      }
      return null // Continue with proxy
    },
    rewrite: (path) => {
      const newPath = path.replace(/^\/api/, '')
      process.stdout.write(`[Proxy] ${path} -> ${newPath} (${backendUrl})\n`)
      return newPath
    },
    configure: (proxy) => {
      proxy.on('error', (err: Error, _req, res) => {
        process.stdout.write(`[Proxy Error] ${err.message}\n`)
        // Send error response instead of hanging
        if (!res.headersSent) {
          res.writeHead(502, {
            'Content-Type': 'application/json',
          })
          res.end(JSON.stringify({ 
            error: 'Backend server is not running',
            details: err.message,
            target: backendUrl 
          }))
        }
      });
      proxy.on('proxyReq', (proxyReq, req) => {
       const fullUrl = `${backendUrl}${req.url}`
        process.stdout.write(`[Proxy Request] 
          Method: ${req.method}
          Original URL: ${req.url}
          Target URL: ${fullUrl}
        \n`)
        proxyReq.setHeader('Accept', 'application/json')
        proxyReq.setHeader('Content-Type', 'application/json')
      });
      proxy.on('proxyRes', (proxyRes, req, res) => {
        res.setHeader('Content-Type', 'application/json')
        process.stdout.write(`[Proxy Response] ${proxyRes.statusCode} ${req.url}\n`)
      });
    }
  }

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
        },
      }), 
      tailwindcss(),
      basicSsl(),
      visualizer({
        filename: 'dist/report.html',
        open: true,                  // auto-opens the report after build
      }) as PluginOption,
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      proxy: {
        '/api': proxyConfig
      }
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': proxyConfig
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            redux: ['@reduxjs/toolkit', 'react-redux'],
            router: ['react-router'],
            icons: ['react-icons'],
            virtual: ['react-virtualized-auto-sizer', 'react-window'],
            tailwind: ['tailwindcss'],
          }
        }
      }
    },
    define: {
      __APP_VERSION__: JSON.stringify(packageJson.version),
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
  }
})
