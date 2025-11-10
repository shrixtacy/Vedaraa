import { useEffect, useRef } from 'react';
import '@google/model-viewer';

interface ModelViewerProps {
  src: string;
  alt?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  cameraOrbit?: string;
  disableInteraction?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const ModelViewer = ({ 
  src, 
  alt = "3D Model", 
  autoRotate = true,
  cameraControls = true,
  cameraOrbit = "0deg 75deg 105%",
  disableInteraction = false
}: ModelViewerProps) => {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.addEventListener('load', () => {
        console.log('Model loaded successfully from:', src);
      });
      viewer.addEventListener('error', (event: any) => {
        console.error('Error loading model from:', src, event);
        console.error('Make sure the file exists at:', window.location.origin + src);
      });
    }
  }, [src]);

  return (
    <model-viewer
      ref={viewerRef}
      src={src}
      alt={alt}
      auto-rotate={autoRotate}
      camera-controls={!disableInteraction && cameraControls}
      camera-orbit={cameraOrbit}
      shadow-intensity="1"
      exposure="1"
      shadow-softness="0.5"
      disable-zoom={disableInteraction}
      disable-pan={disableInteraction}
      interaction-prompt="none"
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        pointerEvents: disableInteraction ? 'none' : 'auto',
      }}
      loading="eager"
      reveal="auto"
    >
      {/* Empty progress bar slot - no loading indicator */}
      <div slot="progress-bar" style={{ display: 'none' }} />
    </model-viewer>
  );
};

export default ModelViewer;