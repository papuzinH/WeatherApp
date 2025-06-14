import React from 'react';
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiNightClear,
  WiNightCloudy,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiDayFog,
} from 'react-icons/wi';

const WeatherCard = ({ data, isLoading = false, location }) => {
  const getWeatherIcon = (weather, isDay = true) => {
    const iconProps = { size: 80, className: 'text-white drop-shadow-2xl' };

    if (!weather) return <WiDaySunny {...iconProps} />;

    switch (weather.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return isDay ? (
          <WiDaySunny {...iconProps} />
        ) : (
          <WiNightClear {...iconProps} />
        );
      case 'clouds':
      case 'cloudy':
      case 'overcast':
        return isDay ? (
          <WiCloudy {...iconProps} />
        ) : (
          <WiNightCloudy {...iconProps} />
        );
      case 'rain':
      case 'drizzle':
        return <WiRain {...iconProps} />;
      case 'snow':
        return <WiSnow {...iconProps} />;
      case 'thunderstorm':
        return <WiThunderstorm {...iconProps} />;
      default:
        return <WiDaySunny {...iconProps} />;
    }
  };

  const formatTemperature = (temp) => {
    return Math.round(temp);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="w-full glass-card rounded-3xl p-8 hover-lift transition-all">
        <div className="animate-pulse">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-white/20 rounded-full"></div>
          </div>
          <div className="text-center space-y-4">
            <div className="h-8 bg-white/20 rounded-lg mx-auto w-48"></div>
            <div className="h-16 bg-white/20 rounded-lg mx-auto w-32"></div>
            <div className="h-6 bg-white/20 rounded-lg mx-auto w-64"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 20;
  const weatherCondition = data.weather?.[0]?.main || 'Clear';
  const weatherDescription = data.weather?.[0]?.description || '';

  return (
    <div className="w-full glass-card rounded-3xl p-6 hover-lift transition-all">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          📍 {location || data.name}
        </h2>
        <p className="text-white/70 text-base capitalize">
          {weatherDescription}
        </p>
        <p className="text-white/60 text-xs">
          Actualizado: {formatTime(data.dt)}
        </p>
      </div>

      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          {getWeatherIcon(weatherCondition, isDay)}
        </div>
        <div className="text-5xl font-bold text-white mb-2">
          {formatTemperature(data.main.temp)}°C
        </div>
        <div className="text-white/80 text-lg">
          Se siente como {formatTemperature(data.main.feels_like)}°C
        </div>
        <div className="flex justify-center items-center space-x-4 mt-3 text-white/70 text-sm">
          <span className="flex items-center">
            Max: {formatTemperature(data.main.temp_max)}°C
          </span>
          <span className="flex items-center">
            Min: {formatTemperature(data.main.temp_min)}°C
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-3 text-center hover-lift">
          <WiHumidity className="text-blue-300 mx-auto mb-1" size={32} />
          <p className="text-white/70 text-xs mb-1">Humedad</p>
          <p className="text-white text-lg font-semibold">
            {data.main.humidity}%
          </p>
        </div>
        <div className="glass rounded-xl p-3 text-center hover-lift">
          <WiStrongWind className="text-gray-300 mx-auto mb-1" size={32} />
          <p className="text-white/70 text-xs mb-1">Viento</p>
          <p className="text-white text-lg font-semibold">
            {Math.round(data.wind.speed * 3.6)} km/h
          </p>
        </div>
        <div className="glass rounded-xl p-3 text-center hover-lift">
          <WiBarometer className="text-yellow-300 mx-auto mb-1" size={32} />
          <p className="text-white/70 text-xs mb-1">Presión</p>
          <p className="text-white text-lg font-semibold">
            {data.main.pressure} hPa
          </p>
        </div>{' '}
        <div className="glass rounded-xl p-3 text-center hover-lift">
          <WiDayFog className="text-green-300 mx-auto mb-1" size={32} />
          <p className="text-white/70 text-xs mb-1">Visibilidad</p>
          <p className="text-white text-lg font-semibold">
            {data.visibility ? Math.round(data.visibility / 1000) : 'N/A'} km
          </p>
        </div>
      </div>

      {data.sys && (
        <div className="mt-4 flex justify-center space-x-8 text-white/70 text-sm">
          <div className="text-center">
            <p className="text-xs mb-1">🌅 Amanecer</p>
            <p className="font-semibold">{formatTime(data.sys.sunrise)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs mb-1">🌅 Atardecer</p>
            <p className="font-semibold">{formatTime(data.sys.sunset)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
