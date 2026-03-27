// src/components/Scene/Scene.tsx

interface SceneProps {
  sceneId: string;
  decorations: string[];
  children?: React.ReactNode;
}

export function Scene({ sceneId, decorations, children }: SceneProps) {
  const sceneImage = sceneId.replace('scene_', '/bexo-pet/assets/scenes/') + '.svg';

  return (
    <div className="relative w-full h-96 bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
      {/* Background */}
      <img
        src={sceneImage}
        alt="Scene"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: 'pixelated' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/bexo-pet/assets/scenes/default.svg';
        }}
      />

      {/* Decorations Layer */}
      {decorations.map((decorId, index) => {
        const decorImage = decorId.replace('decor_', '/bexo-pet/assets/decor/') + '.svg';
        return (
          <img
            key={decorId}
            src={decorImage}
            alt={decorId}
            className="absolute w-24 h-24 object-contain"
            style={{
              left: `${20 + (index * 15)}%`,
              bottom: '10%',
              imageRendering: 'pixelated'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        );
      })}

      {/* Mascot Layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
