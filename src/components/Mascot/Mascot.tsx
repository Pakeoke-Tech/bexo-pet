// src/components/Mascot/Mascot.tsx
import type { MascotAnimation } from '../../types';
import { BASE_PATH } from '../../config';

interface MascotProps {
  skinId: string;
  animation?: MascotAnimation;
}

export function Mascot({ skinId, animation = 'idle' }: MascotProps) {
  const skinImage = skinId.replace('skin_', `${BASE_PATH}assets/skins/`) + '.png';

  return (
    <div className="relative w-48 h-48 mx-auto drop-shadow-2xl">
      <img
        src={skinImage}
        alt="Mascot"
        className={`w-full h-full object-contain ${
          animation === 'happy' ? 'animate-bounce' :
          animation === 'sleep' ? 'animate-pulse' :
          ''
        }`}
        style={{ imageRendering: 'pixelated' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = `${BASE_PATH}assets/skins/default.svg`;
        }}
      />
    </div>
  );
}
