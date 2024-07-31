import React, { useEffect, useState } from 'react';
import './Weather.css';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

interface WeatherProps {
  location: string;
  // loading: boolean;
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// const Weather: React.FC = ({location:string}): React.ReactElement => {
  // const Weather: React.FC = (): React.ReactElement => {
const Weather: React.FC<WeatherProps> = ({ location}): React.ReactElement  => {
  console.log('In wethaer loc has: '+ location);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('In wethaer loc has IN USEEFFECT: '+ location);
    const fetchWeather = async () => {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&days=1&aqi=no&alerts=no`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: WeatherData) => {
          setWeather(data);
        })
        .catch((error: Error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchWeather();
  // }, [loading]);
}, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div id="myResult" className='ml-14 mt-32'>
      <h1>Weather in {weather?.location.name}, {weather?.location.region}</h1>
      <p>Country: {weather?.location.country}</p>
      <p>Temperature: {weather?.current.temp_c}°C / {weather?.current.temp_f}°F</p>
      <p>Condition: {weather?.current.condition.text}</p>
      <p>Wind: {weather?.current.wind_kph} kph ({weather?.current.wind_dir})</p>
      <p>Humidity: {weather?.current.humidity}%</p>
      <p>Feels Like: {weather?.current.feelslike_c}°C / {weather?.current.feelslike_f}°F</p>
      <img src={`https:${weather?.current.condition.icon}`} alt={weather?.current.condition.text} />
    </div>
  );
};

export default Weather;
