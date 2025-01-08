import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

 export default defineConfig({
  plugins: [react()],
  define: {'process.env':{
    API_URL: process.env.REACT_APP_API_URL
  }}
})
