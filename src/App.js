import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeeklyForecast from './components/WeeklyForecast';
import WeatherVideoBackground from './components/WeatherVideoBackground';
import VideoPreloader from './components/VideoPreloader';
import { weatherService } from './services/weatherService';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('');
  const [videosPreloaded, setVideosPreloaded] = useState(false);

  // Callback para cuando todos los videos estén precargados
  const handleVideosPreloaded = useCallback((success) => {
    console.log('🎉 Videos precargados:', success);
    setVideosPreloaded(success);
  }, []);

  // Buscar clima por ciudad - Optimizado con useCallback
  const searchWeather = useCallback(async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const weatherData = await weatherService.getCurrentWeatherByCity(city);
      const forecastData = await weatherService.getForecastByCity(city);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setCurrentLocation(weatherData.name);
    } catch (err) {
      setError(`No se pudo encontrar el clima para "${city}"`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener ubicación actual del usuario - Optimizado con useCallback
  const getCurrentLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const weatherData = await weatherService.getCurrentWeatherByCoords(
              latitude,
              longitude
            );
            const forecastData = await weatherService.getForecastByCoords(
              latitude,
              longitude
            );

            setCurrentWeather(weatherData);
            setForecast(forecastData);
            setCurrentLocation(weatherData.name);
          } catch (err) {
            setError('Error al obtener datos del clima');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError('No se pudo obtener la ubicación. Buscando por defecto...');
          searchWeather('Madrid'); // Ciudad por defecto
        }
      );
    } else {
      setError('Geolocalización no soportada. Buscando por defecto...');
      searchWeather('Madrid'); // Ciudad por defecto
    }
  }, [searchWeather]);

  // Cargar datos al iniciar la aplicación solo después de que los videos estén precargados
  useEffect(() => {
    if (videosPreloaded) {
      getCurrentLocation();
    }
  }, [videosPreloaded, getCurrentLocation]);

  console.log('🌤️ Current Weather:', currentWeather);
  return (
    <div className="h-screen overflow-hidden relative">
      {/* Preloader de videos */}
      <VideoPreloader onAllVideosLoaded={handleVideosPreloaded} />

      {/* Video de fondo dinámico */}
      <WeatherVideoBackground
        weatherCondition={currentWeather?.weather?.[0]?.main}
        weatherDescription={currentWeather?.weather?.[0]?.description}
        isVisible={!!currentWeather && videosPreloaded}
        videosPreloaded={videosPreloaded}
      />

      <div className="h-full flex flex-col relative z-10">
        {/* Header */}
        <header className="text-center py-3 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
            ☀️ Weather App
          </h1>
        </header>

        {/* Main Content - Solo se muestra si los videos están precargados */}
        {videosPreloaded && (
          <main className="flex-1 px-4 pb-2 w-full max-w-4xl mx-auto overflow-y-auto">
            {/* Search Bar */}
            <div className="mx-auto mb-3">
              <SearchBar
                onSearch={searchWeather}
                loading={loading}
                getCurrentLocation={getCurrentLocation}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-2xl mx-auto mb-3">
                <div className="glass rounded-xl p-2 border-l-4 border-red-400">
                  <p className="text-white text-center text-xs">{error}</p>
                </div>
              </div>
            )}

            <div className="flex justify-center items-start gap-5 w-full flex-col md:flex-row">
              {/* Current Weather */}
              {currentWeather && (
                <WeatherCard
                  data={currentWeather}
                  isLoading={loading}
                  location={currentLocation}
                />
              )}

              {/* Weekly Forecast */}
              {forecast && (
                <WeeklyForecast data={forecast} isLoading={loading} />
              )}
            </div>

            {/* Loading State */}
            {loading && !currentWeather && (
              <div className="flex justify-center items-center h-64">
                <div className="glass rounded-xl p-6">
                  <div className="flex flex-col items-center">
                    <div className="spinner border-4 border-white/20 border-t-white rounded-full w-10 h-10 mb-3"></div>
                    <p className="text-white text-sm">
                      Cargando datos del clima...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}

        {/* Footer */}
        <footer className="text-center py-2 px-4 text-white/60 text-xs">
          <p>© 2025 Weather App - Datos proporcionados por OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
