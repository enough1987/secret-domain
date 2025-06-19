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
      port: 3000,
      open: true,
  },
})
