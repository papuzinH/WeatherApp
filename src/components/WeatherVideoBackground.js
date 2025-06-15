import React from 'react';

const WeatherVideoBackground = ({
  weatherCondition,
  weatherDescription,
  isVisible,
  videosPreloaded,
}) => {
  // Mapeo de condiciones climáticas a videos y fallbacks CSS
  const weatherConfigs = {
    // Condiciones soleadas (OpenWeatherMap main conditions)
    Clear: {
      video: '/videos/soleado.mp4',
      fallback: {
        background: `
          radial-gradient(circle at 30% 20%, rgba(255, 223, 0, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 70% 30%, rgba(255, 165, 0, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #87CEEB 0%, #98D8E8 25%, #B8E6B8 50%, #87CEEB 100%)
        `,
        animation: 'sunGlow 4s ease-in-out infinite alternate',
      },
    },

    // Condiciones nubladas
    Clouds: {
      video: '/videos/muynublado.mp4',
      fallback: {
        background: `
          radial-gradient(ellipse at 40% 20%, rgba(169, 169, 169, 0.6) 0%, transparent 70%),
          radial-gradient(ellipse at 80% 50%, rgba(128, 128, 128, 0.4) 0%, transparent 60%),
          linear-gradient(135deg, #696969 0%, #808080 25%, #A9A9A9 50%, #D3D3D3 100%)
        `,
        animation: 'cloudMove 8s ease-in-out infinite',
      },
    },

    SomeClouds: {
      video: '/videos/nublado.mp4',
      fallback: {
        background: `
            radial-gradient(ellipse at 40% 20%, rgba(169, 169, 169, 0.6) 0%, transparent 70%),
            radial-gradient(ellipse at 80% 50%, rgba(128, 128, 128, 0.4) 0%, transparent 60%),
            linear-gradient(135deg, #696969 0%, #808080 25%, #A9A9A9 50%, #D3D3D3 100%)
          `,
        animation: 'cloudMove 8s ease-in-out infinite',
      },
    },

    // Condiciones de lluvia
    Rain: {
      video: '/videos/rain-background.mp4',
      fallback: {
        background: `
          linear-gradient(45deg, transparent 65%, rgba(200,220,255,0.1) 65%, rgba(200,220,255,0.1) 67%, transparent 67%),
          linear-gradient(-45deg, transparent 63%, rgba(200,220,255,0.08) 63%, rgba(200,220,255,0.08) 65%, transparent 65%),
          linear-gradient(30deg, transparent 70%, rgba(200,220,255,0.05) 70%, rgba(200,220,255,0.05) 72%, transparent 72%),
          linear-gradient(135deg, #1a252f 0%, #2c3e50 25%, #34495e 50%, #2c3e50 75%, #1a252f 100%)
        `,
        backgroundSize: '15px 40px, 12px 35px, 18px 30px, 100% 100%',
        animation: 'rainFall 0.8s linear infinite',
      },
    },

    Drizzle: {
      video: '/videos/rain-background.mp4',
      fallback: {
        background: `
          linear-gradient(45deg, transparent 65%, rgba(200,220,255,0.1) 65%, rgba(200,220,255,0.1) 67%, transparent 67%),
          linear-gradient(-45deg, transparent 63%, rgba(200,220,255,0.08) 63%, rgba(200,220,255,0.08) 65%, transparent 65%),
          linear-gradient(30deg, transparent 70%, rgba(200,220,255,0.05) 70%, rgba(200,220,255,0.05) 72%, transparent 72%),
          linear-gradient(135deg, #1a252f 0%, #2c3e50 25%, #34495e 50%, #2c3e50 75%, #1a252f 100%)
        `,
        backgroundSize: '15px 40px, 12px 35px, 18px 30px, 100% 100%',
        animation: 'rainFall 0.8s linear infinite',
      },
    },

    Thunderstorm: {
      video: '/videos/rain-background.mp4',
      fallback: {
        background: `
          linear-gradient(45deg, transparent 65%, rgba(200,220,255,0.1) 65%, rgba(200,220,255,0.1) 67%, transparent 67%),
          linear-gradient(-45deg, transparent 63%, rgba(200,220,255,0.08) 63%, rgba(200,220,255,0.08) 65%, transparent 65%),
          linear-gradient(30deg, transparent 70%, rgba(200,220,255,0.05) 70%, rgba(200,220,255,0.05) 72%, transparent 72%),
          linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 25%, #3a3a3a 50%, #2c2c2c 75%, #1a1a1a 100%)
        `,
        backgroundSize: '15px 40px, 12px 35px, 18px 30px, 100% 100%',
        animation:
          'rainFall 0.8s linear infinite, lightning 3s ease-in-out infinite',
      },
    },

    // Condiciones de nieve
    Snow: {
      video: '/videos/nevado.mp4',
      fallback: {
        background: `
          radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 2px, transparent 2px),
          radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.4) 1.5px, transparent 1.5px),
          linear-gradient(135deg, #E6E6FA 0%, #F0F8FF 25%, #FFFFFF 50%, #F0F8FF 75%, #E6E6FA 100%)
        `,
        backgroundSize: '50px 50px, 30px 30px, 40px 40px, 100% 100%',
        animation: 'snowFall 3s linear infinite',
      },
    },

    // Otras condiciones atmosféricas
    Mist: {
      video: '/videos/nublado.mp4',
      fallback: {
        background: `
          radial-gradient(ellipse at 50% 50%, rgba(200, 200, 200, 0.5) 0%, transparent 70%),
          linear-gradient(135deg, #B0C4DE 0%, #D3D3D3 50%, #F5F5F5 100%)
        `,
        animation: 'cloudDrift 6s ease-in-out infinite',
      },
    },

    Fog: {
      video: '/videos/nublado.mp4',
      fallback: {
        background: `
          radial-gradient(ellipse at 50% 50%, rgba(200, 200, 200, 0.5) 0%, transparent 70%),
          linear-gradient(135deg, #B0C4DE 0%, #D3D3D3 50%, #F5F5F5 100%)
        `,
        animation: 'cloudDrift 6s ease-in-out infinite',
      },
    },
  };

  // Determinar qué configuración usar basándose en la condición climática
  const getWeatherConfig = (condition, weatherDescription) => {
    if (!condition) return null;
    if (condition === 'Clouds') {
      // Si la descripción contiene "nublado", usar la configuración de nublado
        
      if (
        weatherDescription &&
        weatherDescription.toLowerCase().includes('nublado')
      ) {
        return weatherConfigs.Clouds;
      }
      if (
        weatherDescription &&
        weatherDescription.toLowerCase().includes('algo de nubes')
      ) {
        return weatherConfigs.SomeClouds;
      }
    }
    return weatherConfigs[condition] || null;
  };

  const currentWeatherConfig = getWeatherConfig(
    weatherCondition,
    weatherDescription
  );
  const shouldShowBackground = currentWeatherConfig !== null;

  if (!shouldShowBackground || !isVisible || !currentWeatherConfig) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Video de fondo - Solo se muestra si los videos están precargados */}
      {videosPreloaded && (
        <div className="absolute inset-0">
          <video
            key={weatherCondition}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-100 transition-opacity duration-1000"
            style={{
              filter: 'blur(2px) brightness(0.7)',
              transform: 'scale(1.05)',
            }}
          >
            <source src={currentWeatherConfig.video} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Fallback: Fondo CSS animado - Se muestra si los videos no están precargados */}
      {!videosPreloaded && (
        <div
          className="absolute inset-0"
          style={{
            background: currentWeatherConfig.fallback.background,
            backgroundSize:
              currentWeatherConfig.fallback.backgroundSize || '100% 100%',
            animation: currentWeatherConfig.fallback.animation || 'none',
          }}
        />
      )}

      {/* Overlay para mejorar legibilidad del texto */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default WeatherVideoBackground;
