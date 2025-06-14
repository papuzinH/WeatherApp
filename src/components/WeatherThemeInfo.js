import React, { memo } from 'react';

/**
 * Componente para mostrar información sobre el tema climático actual
 * Implementa React.memo para optimización de rendimiento
 */
const WeatherThemeInfo = memo(({ theme, mood, weatherCondition }) => {
  // Mapeo de temas a descripciones en español
  const themeDescriptions = {
    sunny: {
      title: '☀️ Clima Soleado',
      description: 'Tonalidades cálidas y brillantes que reflejan la energía del sol',
      colors: ['Dorado', 'Naranja', 'Rosa coral', 'Azul cielo']
    },
    cloudy: {
      title: '☁️ Clima Nublado', 
      description: 'Tonalidades grises y frías que evocan la tranquilidad de las nubes',
      colors: ['Gris perla', 'Azul acero', 'Plata', 'Blanco nube']
    },
    rainy: {
      title: '🌧️ Clima Lluvioso',
      description: 'Tonalidades azules y grises que capturan la esencia de la lluvia',
      colors: ['Azul océano', 'Gris tormenta', 'Azul celeste', 'Plateado']
    },
    snowy: {
      title: '❄️ Clima Nevado',
      description: 'Tonalidades frías y claras que reflejan la pureza de la nieve',
      colors: ['Blanco nieve', 'Azul glacial', 'Celeste', 'Platino']
    },
    storm: {
      title: '⛈️ Tormenta',
      description: 'Tonalidades muy oscuras y frías que transmiten la intensidad de la tormenta',
      colors: ['Negro carbón', 'Púrpura oscuro', 'Azul medianoche', 'Gris antracita']
    },
    foggy: {
      title: '🌫️ Clima con Niebla',
      description: 'Tonalidades suaves y misteriosas que evocan la sutileza de la niebla',
      colors: ['Gris humo', 'Blanco perla', 'Beige', 'Plata mate']
    },
    default: {
      title: '🌈 Clima Variado',
      description: 'Gradientes dinámicos que se adaptan a cualquier condición',
      colors: ['Múltiples tonalidades', 'Gradientes suaves', 'Colores armoniosos']
    }
  };

  const currentTheme = themeDescriptions[theme] || themeDescriptions.default;

  // No renderizar si no hay información del tema
  if (!theme) return null;

  return (
    <div className="glass rounded-xl p-4 mb-4 max-w-sm mx-auto">
      <div className="text-center">
        <h3 className="text-white font-semibold text-lg mb-2">
          {currentTheme.title}
        </h3>
        
        <p className="text-white/80 text-sm mb-3 leading-relaxed">
          {currentTheme.description}
        </p>

        {/* Indicador visual del estado de ánimo */}
        <div className="flex items-center justify-center mb-3">
          <span className="text-white/60 text-xs mr-2">Estado:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodStyle(mood)}`}>
            {getMoodLabel(mood)}
          </span>
        </div>

        {/* Paleta de colores */}
        <div className="space-y-2">
          <p className="text-white/60 text-xs">Paleta de colores:</p>
          <div className="flex flex-wrap gap-1 justify-center">
            {currentTheme.colors.map((color, index) => (
              <span 
                key={index}
                className="text-white/70 text-xs bg-white/10 px-2 py-1 rounded-full"
              >
                {color}
              </span>
            ))}
          </div>
        </div>

        {/* Condición meteorológica actual */}
        {weatherCondition && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-white/60 text-xs">
              Condición: <span className="text-white font-medium">{weatherCondition}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

// Función helper para obtener el estilo del estado de ánimo
const getMoodStyle = (mood) => {
  const moodStyles = {
    warm: 'bg-orange-500/30 text-orange-200 border border-orange-400/50',
    cool: 'bg-blue-500/30 text-blue-200 border border-blue-400/50', 
    cold: 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50',
    dark: 'bg-purple-500/30 text-purple-200 border border-purple-400/50',
    mysterious: 'bg-gray-500/30 text-gray-200 border border-gray-400/50',
    neutral: 'bg-white/20 text-white border border-white/30'
  };
  
  return moodStyles[mood] || moodStyles.neutral;
};

// Función helper para obtener la etiqueta del estado de ánimo
const getMoodLabel = (mood) => {
  const moodLabels = {
    warm: 'Cálido',
    cool: 'Fresco', 
    cold: 'Frío',
    dark: 'Intenso',
    mysterious: 'Misterioso',
    neutral: 'Neutral'
  };
  
  return moodLabels[mood] || 'Neutral';
};

// Asignar nombre para debugging
WeatherThemeInfo.displayName = 'WeatherThemeInfo';

export default WeatherThemeInfo;
