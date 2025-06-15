import React, { useState, useEffect } from 'react';

const VideoPreloader = ({ onAllVideosLoaded }) => {
  const [loadedVideos, setLoadedVideos] = useState({});
  const [allLoaded, setAllLoaded] = useState(false);

  // Definir videos fuera del useEffect para evitar dependencias
  const videos = React.useMemo(() => [
    { id: 'soleado', src: '/videos/soleado.mp4', name: 'Soleado' },
    { id: 'muynublado', src: '/videos/muynublado.mp4', name: 'Muy Nublado' },
    { id: 'nublado', src: '/videos/nublado.mp4', name: 'Nublado' },
    { id: 'rain', src: '/videos/rain-background.mp4', name: 'Lluvia' },
    { id: 'nevado', src: '/videos/nevado.mp4', name: 'Nieve' }
  ], []);

  useEffect(() => {
    const preloadVideos = async () => {
      const loadPromises = videos.map((video) => {
        return new Promise((resolve, reject) => {
          const videoElement = document.createElement('video');
          videoElement.preload = 'auto';
          videoElement.muted = true;
          
          videoElement.oncanplaythrough = () => {
            setLoadedVideos(prev => ({ ...prev, [video.id]: true }));
            resolve(video.id);
          };
          
          videoElement.onerror = () => {
            setLoadedVideos(prev => ({ ...prev, [video.id]: false }));
            reject(new Error(`Failed to load ${video.name}`));
          };
          
          videoElement.src = video.src;
        });
      });

      try {
        await Promise.allSettled(loadPromises);
        setAllLoaded(true);
        onAllVideosLoaded?.(true);
      } catch (error) {
        setAllLoaded(true);
        onAllVideosLoaded?.(false);      }
    };

    preloadVideos();
  }, [onAllVideosLoaded, videos]);

  const loadedCount = Object.values(loadedVideos).filter(Boolean).length;
  const totalCount = videos.length;
  const progress = (loadedCount / totalCount) * 100;

  if (allLoaded) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">🌤️ Weather App</h2>
          <p className="text-lg opacity-80">Cargando experiencia climática...</p>
        </div>
        
        <div className="mb-6">
          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm opacity-70">
            {loadedCount} de {totalCount} videos cargados ({Math.round(progress)}%)
          </p>
        </div>

        <div className="space-y-1">
          {videos.map((video) => (
            <div key={video.id} className="flex items-center justify-center text-sm">
              <span className="mr-2">
                {loadedVideos[video.id] === true ? '✅' : 
                 loadedVideos[video.id] === false ? '❌' : '⏳'}
              </span>
              <span className={loadedVideos[video.id] === true ? 'opacity-100' : 'opacity-50'}>
                {video.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPreloader;
