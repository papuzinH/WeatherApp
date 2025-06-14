import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'es'
  }
});

export const weatherService = {
  // Obtener clima actual por ciudad
  getCurrentWeatherByCity: async (city) => {
    try {
      const response = await api.get('/weather', {
        params: { q: city }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener el clima');
    }
  },

  // Obtener clima actual por coordenadas
  getCurrentWeatherByCoords: async (lat, lon) => {
    try {
      const response = await api.get('/weather', {
        params: { lat, lon }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener el clima');
    }
  },

  // Obtener pronóstico de 5 días
  getForecastByCity: async (city) => {
    try {
      const response = await api.get('/forecast', {
        params: { q: city }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener el pronóstico');
    }
  },
  // Obtener pronóstico de 5 días por coordenadas
  getForecastByCoords: async (lat, lon) => {
    try {
      const response = await api.get('/forecast', {
        params: { lat, lon }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener el pronóstico');
    }
  },

  // Buscar ciudades para autocompletado
  searchCities: async (query) => {
    try {
      const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al buscar ciudades');
    }
  }
};

// Servicio de geolocalización
export const locationService = {
  getCurrentPosition: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada por el navegador'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          let errorMessage = 'Error al obtener la ubicación';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permiso de ubicación denegado';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Información de ubicación no disponible';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tiempo de espera agotado';
              break;
            default:
              break;
          }
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000 // 10 minutos
        }
      );
    });
  }
};
