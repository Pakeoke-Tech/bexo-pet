// src/config.ts
// Base path para assets - funciona tanto en dev como en producción
// En dev (localhost): '/'
// En producción con GitHub Pages: '/bexo-pet/' (según vite.config.ts)
export const BASE_PATH = import.meta.env.BASE_URL || '/';
