import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // <--- ¡ESTA ES LA LÍNEA MÁGICA QUE FALTA!
})