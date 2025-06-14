import React, { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar cambios de tema
 * Sigue las mejores prácticas: hooks enfocados y reutilizables
 */
export const useThemeTransition = (currentTheme) => {
  const [previousTheme, setPreviousTheme] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Solo activar transición si hay un tema previo diferente
    if (previousTheme && previousTheme !== currentTheme) {
      setIsTransitioning(true);
      
      // Desactivar la transición después de un tiempo
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
    
    // Actualizar el tema previo
    setPreviousTheme(currentTheme);
  }, [currentTheme, previousTheme]);

  return { isTransitioning, previousTheme };
};
