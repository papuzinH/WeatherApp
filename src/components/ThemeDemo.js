import React, { useState, memo } from 'react';

/**
 * Componente de demostración para mostrar todos los temas disponibles
 * Útil para testing y presentación de la funcionalidad
 */
const ThemeDemo = memo(() => {
  const [selectedTheme, setSelectedTheme] = useState('sunny');

  // Definición de todos los temas disponibles
  const availableThemes = [
    {
      id: 'sunny',
      name: 'Soleado',
      emoji: '☀️',
      class: 'weather-sunny',
      description: 'Tonalidades cálidas y brillantes'
    },
    {
      id: 'cloudy',
      name: 'Nublado',
      emoji: '☁️',
      class: 'weather-cloudy',
      description: 'Tonalidades grises y frías'
    },
    {
      id: 'rainy',
      name: 'Lluvioso',
      emoji: '🌧️',
      class: 'weather-rainy',
      description: 'Tonalidades azules con efectos de lluvia'
    },
    {
      id: 'snowy',
      name: 'Nevado',
      emoji: '❄️',
      class: 'weather-snowy',
      description: 'Tonalidades frías con efectos de nieve'
    },
    {
      id: 'storm',
      name: 'Tormenta',
      emoji: '⛈️',
      class: 'weather-thunderstorm',
      description: 'Tonalidades oscuras con efectos de rayos'
    },
    {
      id: 'foggy',
      name: 'Niebla',
      emoji: '🌫️',
      class: 'weather-foggy',
      description: 'Tonalidades suaves y misteriosas'
    }
  ];

  const currentTheme = availableThemes.find(theme => theme.id === selectedTheme);

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="glass-strong rounded-xl p-4 w-80">
        <h3 className="text-white font-semibold mb-3 text-sm flex items-center">
          🎨 Demo de Temas Dinámicos
        </h3>
        
        {/* Selector de temas */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {availableThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`p-2 rounded-lg text-xs transition-all duration-300 ${
                selectedTheme === theme.id
                  ? 'bg-white/30 border-2 border-white/50 scale-105'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-lg mb-1">{theme.emoji}</div>
              <div className="text-white/90 font-medium">{theme.name}</div>
            </button>
          ))}
        </div>

        {/* Información del tema seleccionado */}
        {currentTheme && (
          <div className="border-t border-white/20 pt-3">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">{currentTheme.emoji}</span>
              <span className="text-white font-medium">{currentTheme.name}</span>
            </div>
            <p className="text-white/70 text-xs leading-relaxed">
              {currentTheme.description}
            </p>
            <div className="mt-2 text-white/50 text-xs">
              Clase CSS: <code className="bg-white/10 px-1 rounded">{currentTheme.class}</code>
            </div>
          </div>
        )}

        {/* Vista previa miniatura */}
        <div className="mt-3">
          <p className="text-white/60 text-xs mb-2">Vista previa:</p>
          <div className={`${currentTheme?.class} h-16 rounded-lg border border-white/30 relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs bg-black/30 px-2 py-1 rounded">
                {currentTheme?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Nota */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <p className="text-white/50 text-xs">
            💡 Los fondos cambian automáticamente según el clima real en la aplicación principal.
          </p>
        </div>
      </div>
    </div>
  );
});

// Asignar nombre para debugging
ThemeDemo.displayName = 'ThemeDemo';

export default ThemeDemo;
