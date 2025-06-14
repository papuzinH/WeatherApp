import React, { memo } from 'react';
import { useThemeTransition } from '../hooks/useThemeTransition';

/**
 * Componente para mostrar indicador de transición de tema
 * Implementa React.memo para optimización
 */
const ThemeTransitionIndicator = memo(({ theme }) => {
  const { isTransitioning, previousTheme } = useThemeTransition(theme);

  // No mostrar si no hay transición activa
  if (!isTransitioning || !previousTheme) return null;

  // Mapeo de temas a emojis y nombres
  const themeInfo = {
    sunny: { emoji: '☀️', name: 'Soleado' },
    cloudy: { emoji: '☁️', name: 'Nublado' },
    rainy: { emoji: '🌧️', name: 'Lluvioso' },
    snowy: { emoji: '❄️', name: 'Nevado' },
    storm: { emoji: '⛈️', name: 'Tormenta' },
    foggy: { emoji: '🌫️', name: 'Niebla' },
    default: { emoji: '🌈', name: 'Variado' }
  };

  const fromTheme = themeInfo[previousTheme] || themeInfo.default;
  const toTheme = themeInfo[theme] || themeInfo.default;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
      <div className="glass-strong rounded-xl p-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-white/80 text-sm">
            <span className="text-lg mr-1">{fromTheme.emoji}</span>
            <span>{fromTheme.name}</span>
          </div>
          
          <div className="text-white/60">
            <svg 
              className="w-4 h-4 animate-pulse" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          
          <div className="flex items-center text-white text-sm font-medium">
            <span className="text-lg mr-1">{toTheme.emoji}</span>
            <span>{toTheme.name}</span>
          </div>
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-white/60 text-xs">Cambiando tema dinámico...</p>
        </div>
      </div>
    </div>
  );
});

// Asignar nombre para debugging
ThemeTransitionIndicator.displayName = 'ThemeTransitionIndicator';

export default ThemeTransitionIndicator;
