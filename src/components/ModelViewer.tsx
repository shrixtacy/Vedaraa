import { useEffect, useRef, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.addEventListener('load', () => {
        console.log('Model loaded successfully from:', src);
        setIsLoading(false);
      });
      
      viewer.addEventListener('error', (event: any) => {
        console.error('Error loading model from:', src, event);
        console.error('Make sure the file exists at:', window.location.origin + src);
        setIsLoading(false);
      });

      viewer.addEventListener('progress', (event: any) => {
        const progress = event.detail.totalProgress * 100;
        setLoadProgress(Math.round(progress));
      });
    }
  }, [src]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          zIndex: 10,
          color: '#C9A23F',
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '3px solid rgba(201, 162, 63, 0.3)',
            borderTop: '3px solid #C9A23F',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <p style={{ marginTop: '20px', fontSize: '14px' }}>
            Loading 3D Model... {loadProgress}%
          </p>
        </div>
      )}
      
      <model-viewer
        ref={viewerRef}
        src={src}
        alt={alt}
        auto-rotate={autoRotate}
        camera-controls={!disableInteraction && cameraControls}
        camera-orbit={cameraOrbit}
        shadow-intensity="0.5"
        exposure="1"
        shadow-softness="0.3"
        disable-zoom={disableInteraction}
        disable-pan={disableInteraction}
        interaction-prompt="none"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          pointerEvents: disableInteraction ? 'none' : 'auto',
        }}
        loading="lazy"
        reveal="interaction"
      >
        <div slot="progress-bar" style={{ display: 'none' }} />
      </model-viewer>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ModelViewer;