// src/components/projects/WeatherApp.js

import React, { useState } from 'react';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    // ATENÇÃO: Substitua 'YOUR_OPENWEATHERMAP_API_KEY' pela sua chave da API OpenWeatherMap
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

    const fetchWeather = async () => {
        if (!city) {
            setError('Por favor, insira uma cidade.');
            setWeather(null);
            return;
        }
        if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
            setError('Por favor, configure sua chave da API OpenWeatherMap.');
            setWeather(null);
            return;
        }

        try {
            setError('');
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
            );
            const data = await response.json();

            if (response.ok) {
                setWeather(data);
            } else {
                setError(data.message || 'Cidade não encontrada.');
                setWeather(null);
            }
        } catch (err) {
            setError('Erro ao buscar dados do clima. Tente novamente.');
            setWeather(null);
        }
    };

    const getWeatherIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Consulta de Clima</h2>
                <div className="flex mb-4">
                    <input
                        type="text"
                        className="flex-grow p-3 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nome da cidade"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter') fetchWeather(); }}
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-r-lg transition duration-200"
                        onClick={fetchWeather}
                    >
                        Buscar
                    </button>
                </div>

                {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                {weather && (
                    <div className="weather-info text-center mt-6">
                        <h3 className="text-3xl font-semibold mb-2">{weather.name}, {weather.sys.country}</h3>
                        {weather.weather && weather.weather[0] && (
                            <>
                                <img
                                    src={getWeatherIconUrl(weather.weather[0].icon)}
                                    alt={weather.weather[0].description}
                                    className="mx-auto w-24 h-24"
                                />
                                <p className="text-2xl capitalize">{weather.weather[0].description}</p>
                            </>
                        )}
                        <p className="text-5xl font-extrabold mt-4 mb-2">{Math.round(weather.main.temp)}°C</p>
                        <p className="text-lg">Sensação de {Math.round(weather.main.feels_like)}°C</p>
                        <div className="flex justify-around mt-4 text-lg">
                            <p>Umidade: {weather.main.humidity}%</p>
                            <p>Vento: {Math.round(weather.wind.speed * 3.6)} km/h</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;
