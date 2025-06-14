import { useMemo } from 'react';

/**
 * Custom hook para obtener el tema dinámico según el clima
 * Siguiendo las mejores prácticas de React: hooks enfocados y reutilizables
 */
export const useWeatherTheme = (weatherCondition) => {
  // Memoización para evitar recálculos innecesarios
  const weatherTheme = useMemo(() => {
    if (!weatherCondition) {
      return {
        backgroundClass: 'weather-default',
        theme: 'default',
        mood: 'neutral'
      };
    }

    const condition = weatherCondition.toLowerCase();

    // Mapeo de condiciones climáticas a temas
    const weatherThemes = {
      // Clima soleado - tonalidades cálidas y brillantes
      clear: {
        backgroundClass: 'weather-sunny',
        theme: 'sunny',
        mood: 'warm'
      },
      sunny: {
        backgroundClass: 'weather-sunny',
        theme: 'sunny',
        mood: 'warm'
      },

      // Nublado - tonalidades grises y frías
      clouds: {
        backgroundClass: 'weather-cloudy',
        theme: 'cloudy',
        mood: 'cool'
      },
      cloudy: {
        backgroundClass: 'weather-cloudy',
        theme: 'cloudy',
        mood: 'cool'
      },
      overcast: {
        backgroundClass: 'weather-cloudy',
        theme: 'cloudy',
        mood: 'cool'
      },

      // Lluvia - tonalidades azules y grises
      rain: {
        backgroundClass: 'weather-rainy',
        theme: 'rainy',
        mood: 'cool'
      },
      drizzle: {
        backgroundClass: 'weather-rainy',
        theme: 'rainy',
        mood: 'cool'
      },

      // Nieve - tonalidades frías y claras
      snow: {
        backgroundClass: 'weather-snowy',
        theme: 'snowy',
        mood: 'cold'
      },

      // Tormenta - tonalidades muy oscuras y frías
      thunderstorm: {
        backgroundClass: 'weather-thunderstorm',
        theme: 'storm',
        mood: 'dark'
      },

      // Niebla - tonalidades suaves y misteriosas
      mist: {
        backgroundClass: 'weather-foggy',
        theme: 'foggy',
        mood: 'mysterious'
      },
      fog: {
        backgroundClass: 'weather-foggy',
        theme: 'foggy',
        mood: 'mysterious'
      },
      haze: {
        backgroundClass: 'weather-foggy',
        theme: 'foggy',
        mood: 'mysterious'
      }
    };

    return weatherThemes[condition] || {
      backgroundClass: 'weather-default',
      theme: 'default',
      mood: 'neutral'
    };
  }, [weatherCondition]);

  return weatherTheme;
};
