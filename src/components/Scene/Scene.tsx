// src/components/Scene/Scene.tsx
import { BASE_PATH } from '../../config';

interface SceneProps {
  sceneId: string;
  decorations: string[];
  children?: React.ReactNode;
}

export function Scene({ sceneId, decorations, children }: SceneProps) {
  const sceneImage = sceneId.replace('scene_', `${BASE_PATH}assets/scenes/`) + '.png';

  return (
    <div className="relative w-full h-96 bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
      {/* Capa 1: Escenario (fondo) - z-index 0 */}
      <img
        src={sceneImage}
        alt="Scene"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: 'pixelated', zIndex: 0 }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = `${BASE_PATH}assets/scenes/default.svg`;
        }}
      />

      {/* Capa 2: Decoraciones laterales - z-index 10 */}
      {decorations.map((decorId, index) => {
        const decorImage = decorId.replace('decor_', `${BASE_PATH}assets/decor/`) + '.png';
        // Distribuir decoraciones: mitad a la izquierda, mitad a la derecha
        const isLeftSide = index % 2 === 0;
        const position = isLeftSide ? 5 : 75; // 5% desde izq, 75% desde der
        const offset = (Math.floor(index / 2) * 12); // 12% de separación vertical

        return (
          <img
            key={decorId}
            src={decorImage}
            alt={decorId}
            className="absolute w-20 h-20 object-contain drop-shadow-lg"
            style={{
              left: `${position}%`,
              bottom: `${15 + offset}%`,
              imageRendering: 'pixelated',
              zIndex: 10
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        );
      })}

      {/* Capa 3: Personaje (centro-abajo) - z-index 20 */}
      <div className="absolute inset-0 flex items-end justify-center pb-8" style={{ zIndex: 20 }}>
        <div className="relative">
          {children}
        </div>
      </div>

      {/* Overlay para mejor contraste (opcional) - z-index 5 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 20%)',
          zIndex: 5
        }}
      />
    </div>
  );
}
