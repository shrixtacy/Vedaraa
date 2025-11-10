import { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Model3DProps {
  modelPath: string;
  autoRotate?: boolean;
  onLoad?: () => void;
}

function Model({ modelPath, onLoad }: { modelPath: string; onLoad?: () => void }) {
  const modelRef = useRef<THREE.Group>(null);
  
  let scene;
  try {
    const gltf = useGLTF(modelPath);
    scene = gltf.scene;
  } catch (error) {
    console.error('Error loading 3D model:', error);
    return null;
  }

  useEffect(() => {
    if (scene && onLoad) {
      // Small delay to ensure model is fully rendered
      setTimeout(() => onLoad(), 500);
    }
  }, [scene, onLoad]);

  // Auto-rotate the model slightly
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  if (!scene) return null;

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={1.5}
      position={[0, -1, 0]}
    />
  );
}

function Loader() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#C9A23F" wireframe />
      </mesh>
      <pointLight position={[0, 2, 0]} intensity={1} color="#C9A23F" />
    </group>
  );
}

const Model3DViewer = ({ modelPath, autoRotate = true, onLoad }: Model3DProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleModelLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary text-lg mb-2">3D Model Preview</p>
          <p className="text-muted-foreground text-sm">Model loading temporarily unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-primary text-sm">Loading 3D Model...</p>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onError={handleError}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />

          {/* Model */}
          <Model modelPath={modelPath} onLoad={handleModelLoad} />

          {/* Environment for reflections */}
          <Environment preset="studio" />

          {/* Contact Shadows */}
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />

          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={3}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the model
useGLTF.preload('/mallory-sectional.glb');

export default Model3DViewer;