# Guía para agregar assets (imágenes) personalizados

## Formato requerido

**PNG con transparencia** - Fondo transparente es CRUCIAL para que se vea bien

```
public/assets/
├── skins/
│   ├── dog_basic.png       # 128x128px - Personaje con fondo transparente
│   ├── cat_cyber.png       # 128x128px
│   └── dragon.png          # 128x128px
├── scenes/
│   ├── room_basic.png      # 800x600px - Escenario panorámico horizontal
│   ├── city_cyber.png      # 800x600px
│   └── default.png         # 800x600px - Fallback
└── decor/
    ├── lamp_basic.png      # 64x64px - Objeto pequeño con transparencia
    ├── sofa_comfy.png      # 96x96px
    ├── disco_ball.png      # 64x64px
    └── placeholder.png     # 64x64px - Fallback
```

## Cómo se verán en pantalla

```
┌────────────────────────────────────┐
│         ESCENARIO (fondo)          │
│                                    │
│  [decor1]      🐕       [decor2]   │
│   izq        personaje       der   │
│                                    │
└────────────────────────────────────┘
```

- **Escenario**: Fondo panorámico que llena todo (object-cover)
- **Decoraciones**: Se distribuyen a los costados (izquierda/derecha)
- **Personaje**: Centrado abajo, DENTRO del escenario

## Requisitos visuales

### ✅ BIEN
- Fondo transparente (no cuadrado de color)
- Personaje recortado
- Proporciones correctas
- Estilo pixel art consistente

### ❌ MAL
- Cuadrado con color sólido de fondo
- Imagen comprimida
- Fondos blancos/negros

## Proceso para agregar nuevas skins/items

1. **Coloca tus PNGs** en `public/assets/[carpeta]/`
2. **Agrega el item** en `src/stores/shopStore.ts`:

```typescript
'skin_nuevo_item': {
  id: 'skin_nuevo_item',
  name: 'Nombre del Item',
  description: 'Descripción',
  tier: 3,
  currency: 'rare',
  price: ITEM_TIERS[3].price,
  image: `${BASE_PATH}assets/skins/nuevo_item.png`,
  category: 'skin'
}
```

3. **Hacer build y deploy**:
```bash
npm run build
git add public/assets/
git commit -m "feat: add new skin"
git push
```

## Herramientas recomendadas

- **Aseprite** - Editor de pixel art profesional ($20)
- **Piskel** - Gratis online: https://www.piskelapp.com/
- **GIMP + Photoshop** - Para agregar transparencia
- **Remove.bg** - Eliminar fondo automáticamente

## Ejemplo de asset correcto

```
✅ dog_basic.png (128x128)
   - Fondo: Transparente (checkerboard en editor)
   - Contenido: Perro recortado
   - Sombra: Opcional (drop-shadow lo agrega CSS)
```

## Notas importantes

- El código ya usa `.png` en todas las referencias
- Los SVGs de emoji son solo placeholders
- Reemplaza los archivos SVG por PNGs cuando tengas los assets
- El layout se ajusta automáticamente con transparencia
