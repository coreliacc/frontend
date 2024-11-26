import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // Permite que la aplicación esté accesible externamente
        port: process.env.PORT || 3000, // Usa el puerto proporcionado por Render o 3000 como fallback
    },
});