# Migrar a otro repositorio

El proyecto está configurado para usar paths dinámicos via `BASE_PATH`, lo que facilita moverlo a otro repositorio.

## Cambios necesarios

### 1. vite.config.ts (OBLIGATORIO)

Cambia el `base` path al nombre del nuevo repositorio:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/nuevo-repo-name/',  // ← Cambiar esto
  // ...
});
```

### 2. public/manifest.json (Opcional - solo si usas PWA)

Si instalas la app como PWA, actualiza el `start_url`:

```json
{
  "start_url": "/nuevo-repo-name/",
  "icons": [
    {
      "src": "/icon-192.png",  // Estos no necesitan cambio
      "sizes": "192x192"
    }
  ]
}
```

## Todo lo demás es automático

No necesitas cambiar nada más porque:

- `src/config.ts`: `BASE_PATH` lee automáticamente de `import.meta.env.BASE_URL`
- Todos los componentes usan `${BASE_PATH}assets/...`
- Todas las imágenes y rutas se ajustan automáticamente

## Ejemplo

Mover de `https://lucianopazg.github.io/bexo-pet/` a `https://tu-hermano.github.io/pet-game/`:

```typescript
// vite.config.ts
base: '/pet-game/',  // Era: '/bexo-pet/'
```

¡Eso es todo! Haz build, commit, push y funcionará.
