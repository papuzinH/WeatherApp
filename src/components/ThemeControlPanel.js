import React, { useState, memo, useCallback } from 'react';

/**
 * Componente para controlar las preferencias del tema dinámico
 * Implementa React.memo y useCallback para optimización
 */
const ThemeControlPanel = memo(({ 
  onToggleAnimations, 
  onToggleThemeInfo, 
  animationsEnabled = true, 
  themeInfoVisible = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Optimizado con useCallback para evitar re-renders innecesarios
  const togglePanel = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleAnimationToggle = useCallback(() => {
    onToggleAnimations?.(!animationsEnabled);
  }, [onToggleAnimations, animationsEnabled]);

  const handleThemeInfoToggle = useCallback(() => {
    onToggleThemeInfo?.(!themeInfoVisible);
  }, [onToggleThemeInfo, themeInfoVisible]);

  return (
    <>
      {/* Botón flotante para abrir/cerrar panel */}
      <button
        onClick={togglePanel}
        className="fixed bottom-4 left-4 z-50 glass-strong rounded-full p-3 hover:scale-105 transition-all duration-300 group"
        aria-label="Abrir panel de preferencias"
      >
        <svg 
          className={`w-6 h-6 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      </button>

      {/* Panel de preferencias */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 z-50 animate-fade-in-up">
          <div className="glass-strong rounded-xl p-4 w-64 shadow-xl">
            <h3 className="text-white font-semibold mb-4 text-sm">
              🎨 Preferencias de Tema
            </h3>
            
            <div className="space-y-4">
              {/* Control de animaciones */}
              <div className="flex items-center justify-between">
                <label className="text-white/80 text-sm">
                  Animaciones
                </label>
                <button
                  onClick={handleAnimationToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                    animationsEnabled 
                      ? 'bg-blue-500/50 border-blue-400' 
                      : 'bg-gray-500/50 border-gray-400'
                  } border`}
                  aria-label={`${animationsEnabled ? 'Desactivar' : 'Activar'} animaciones`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Control de información del tema */}
              <div className="flex items-center justify-between">
                <label className="text-white/80 text-sm">
                  Info del Tema
                </label>
                <button
                  onClick={handleThemeInfoToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                    themeInfoVisible 
                      ? 'bg-blue-500/50 border-blue-400' 
                      : 'bg-gray-500/50 border-gray-400'
                  } border`}
                  aria-label={`${themeInfoVisible ? 'Ocultar' : 'Mostrar'} información del tema`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      themeInfoVisible ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Información adicional */}
              <div className="pt-3 border-t border-white/20">
                <p className="text-white/60 text-xs leading-relaxed">
                  Los fondos se adaptan automáticamente según las condiciones climáticas actuales.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para cerrar el panel */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20"
          onClick={togglePanel}
          aria-label="Cerrar panel de preferencias"
        />
      )}
    </>
  );
});

// Asignar nombre para debugging
ThemeControlPanel.displayName = 'ThemeControlPanel';

export default ThemeControlPanel;
