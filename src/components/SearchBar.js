import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { weatherService } from '../services/weatherService';
import { WiRefresh } from 'react-icons/wi';

const SearchBar = ({ onSearch, loading = false, getCurrentLocation }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  // Buscar ciudades para autocompletado
  const searchCities = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const cities = await weatherService.searchCities(query);
      setSuggestions(cities);
      setShowSuggestions(cities.length > 0);
    } catch (error) {
      console.error('Error buscando ciudades:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Debounce para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCities(city);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [city]);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city.trim());
      setCity('');
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (selectedCity) => {
    const cityName = selectedCity.local_names?.es || selectedCity.name;
    const fullName = selectedCity.state
      ? `${cityName}, ${selectedCity.state}, ${selectedCity.country}`
      : `${cityName}, ${selectedCity.country}`;

    onSearch(fullName);
    setCity('');
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };  return (
    <div
      className="glass rounded-2xl p-4 hover-lift transition-all relative z-50"
      ref={searchRef}
    >
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Buscar ciudad... (mínimo 3 caracteres)"
            disabled={loading}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 disabled:opacity-50"
            autoComplete="off"
          />
          <FiSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
            size={18}
          />
          {isLoadingSuggestions && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner"></div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!city.trim() || loading}
          className="glass-strong rounded-xl px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner"></div>
              <span className="hidden sm:inline">Buscando...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <FiSearch size={16} />
              <span className="hidden sm:inline">Buscar</span>
            </div>
          )}
        </button>
        {/* Refresh Button */}
        <div className="flex justify-center">
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="glass rounded-full p-2 text-white hover:glass-strong transition-all hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
            title="Actualizar ubicación actual"
          >
            <WiRefresh className={`text-xl ${loading ? 'spinner' : ''}`} />
          </button>
        </div>
      </form>      {/* Sugerencias */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white/70 backdrop-blur-xl rounded-xl border border-white/40 max-h-60 overflow-y-auto z-[9999] shadow-2xl"
        >
          {suggestions.map((suggestion, index) => (            <button
              key={`${suggestion.lat}-${suggestion.lon}-${index}`}
              onClick={() => handleCitySelect(suggestion)}
              className="w-full text-left px-4 py-3 text-gray-900 hover:bg-white/50 transition-colors duration-200 border-b border-white/30 last:border-b-0 flex items-center space-x-2"
            >
              <FiMapPin className="text-gray-600 flex-shrink-0" size={14} />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                  {suggestion.local_names?.es || suggestion.name}
                </div>
                <div className="text-gray-700 text-sm truncate">
                  {suggestion.state && `${suggestion.state}, `}
                  {suggestion.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 text-center">
        <p className="text-white/60 text-xs">
          💡 Tip: Escribe al menos 3 caracteres para ver sugerencias
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
