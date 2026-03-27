// src/components/Mascot/Mascot.tsx
import type { MascotAnimation } from '../../types';

interface MascotProps {
  skinId: string;
  animation?: MascotAnimation;
}

export function Mascot({ skinId, animation = 'idle' }: MascotProps) {
  const skinImage = skinId.replace('skin_', '/assets/skins/') + '.png';

  return (
    <div className="relative w-64 h-64 mx-auto">
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
          (e.target as HTMLImageElement).src = '/assets/skins/default.svg';
        }}
      />
    </div>
  );
}
