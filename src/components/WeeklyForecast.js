import React from 'react';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm
} from 'react-icons/wi';

const WeeklyForecast = ({ data, isLoading = false }) => {  const getWeatherIcon = (weather) => {
    const iconProps = { size: 36, className: 'text-white drop-shadow-lg' };
    
    switch (weather?.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <WiDaySunny {...iconProps} />;
      case 'clouds':
      case 'cloudy':
        return <WiCloudy {...iconProps} />;
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

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return days[date.getDay()];
    }
  };

  const processForecastData = (forecastData) => {
    if (!forecastData || !forecastData.list) return [];
    return forecastData.list.slice(0, 5).map(item => ({
      date: item.dt_txt,
      weather: item.weather[0],
      tempMax: Math.round(item.main.temp_max),
      tempMin: Math.round(item.main.temp_min),
      humidity: item.main.humidity,
      wind: Math.round(item.wind.speed * 3.6)
    }));
  };
  if (isLoading) {
    return (
      <div className="glass-card rounded-3xl p-6 w-full h-full ">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          📅 Pronóstico de 5 días
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="glass rounded-xl p-3 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-5 bg-white/20 rounded w-20"></div>
                <div className="h-9 bg-white/20 rounded-full w-9"></div>
                <div className="h-5 bg-white/20 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!data || !data.list) {
    return (
      <div className="w-full glass-card rounded-3xl p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-4">
          📅 Pronóstico de 5 días
        </h3>
        <p className="text-white/70">No hay datos de pronóstico disponibles</p>
      </div>
    );
  }

  const forecastDays = processForecastData(data);
  return (
    <div className="w-full glass-card rounded-3xl p-6 hover-lift transition-all">
      <h3 className="text-xl font-bold text-white mb-4 text-center">
        📅 Pronóstico de 5 días
      </h3>
      
      <div className="space-y-3">
        {forecastDays.map((day, index) => (
          <div 
            key={index} 
            className="glass rounded-xl p-3 hover:glass-strong transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white font-semibold text-base">
                  {getDayName(day.date)}
                </p>
                <p className="text-white/60 text-xs capitalize">
                  {day.weather.description}
                </p>
              </div>

              <div className="flex-1 flex justify-center">
                {getWeatherIcon(day.weather.main)}
              </div>

              <div className="flex-1 text-right">
                <div className="text-white font-bold text-lg">
                  {day.tempMax}° / {day.tempMin}°
                </div>
                <div className="text-white/60 text-xs">
                  💨 {day.wind} km/h • 💧 {day.humidity}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
