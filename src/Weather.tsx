import React, { useEffect, useState } from 'react';
import HourlyGraph from './HourlyGraph';


interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface HourlyForecast {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c?: number;
  windchill_f?: number;
  heatindex_c?: number;
  heatindex_f?: number;
  dewpoint_c?: number;
  dewpoint_f?: number;
  vis_km?: number;
  vis_miles?: number;
  uv?: number;
  gust_mph?: number;
  gust_kph?: number;
  precip_mm?: number;
  precip_in?: number;
}

interface DayForecast {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm?: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition;
  uv: number;
}

interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
}

interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DayForecast;
  astro: Astro;
  hour: HourlyForecast[];
}


interface Forecast {
  forecastday: ForecastDay[];
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
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
}

export interface CurrentForecastWeatherData {
  location: Location;
  current: Current;
  forecast: Forecast;
}

export interface HistoryData{
  location: Location;
  forecast: Forecast;
}

interface WeatherProps {
  location: string;
}

// const Weather: React.FC = ({location:string}): React.ReactElement => {
const Weather: React.FC<WeatherProps> = ({ location}): React.ReactElement  => {
  console.log('In wethaer loc has: '+ location);
  const [curForWeather, setCurForWeather] = useState<CurrentForecastWeatherData | null>(null);
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [IsPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState< {historyOrForecast:string, whichForcastDay:number} | null>(null);
  // let hourlyArray:{tempC:number,icon:string} ;
  useEffect(() => {
    console.log('In wethaer loc has IN USEEFFECT: '+ location);
    const fetchWeather = async () => {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&days=3&aqi=no&alerts=no`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: CurrentForecastWeatherData) => {
          setCurForWeather(data);
        })
        .catch((error: Error) => {
          setError(error);
        });
    };
    fetchWeather();
  // }, [loading]);
  }, [location]);

  useEffect(()=>{
    const fetchHistory = async () => {
      const currentDateStr  = (curForWeather?.current.last_updated.split(' ')[0]) as string; // Extract the date part
      const currentDate: Date = new Date(currentDateStr);
      // Calculate one past date
      const pastDate: Date = new Date(currentDate);
      pastDate.setDate(currentDate.getDate() - 1);
      const formattedDate: string = pastDate.toISOString().split('T')[0]; // Format the date as 'yyyy-MM-dd'
      fetch(`https://api.weatherapi.com/v1/history.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&dt=${formattedDate}`)
        .then(historyResponse =>{
          if (!historyResponse.ok) {
            throw new Error('Network response was not ok');
          }
          return historyResponse.json();
        })
        .then((historyData:HistoryData )=>{
          setHistoryData(historyData);
        })
        .catch((error: Error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if(curForWeather){
      fetchHistory();
    }
  }, [curForWeather]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const openPopup = (forOrHistory: string, forcastNum:number=0) =>{
    setSelectedCard({historyOrForecast:forOrHistory, whichForcastDay:forcastNum });
    setIsPopUpOpen (true);
  };


  const closePopup = () =>{
    setSelectedCard(null);
    setIsPopUpOpen (false);
  };

  return (
    <div className='mt-20 flex items-left flex-col'>
      <div className='flex justify-between mx-3 md:mx-44' >
        <div className='flex max-w-44'>
          <div>
            <p className='  text-5xl md:text-6xl'> {curForWeather?.current.temp_c}</p>
            <h1 className='text-sm'> {curForWeather?.location.name}, {curForWeather?.location.region}</h1>
            <p className='text-xs'> {curForWeather?.location.country}</p>
          </div>
          <div className='flex flex-col justify-between'>
            <p>°C</p>
            <p className='mt-auto mb-10 ml-2 text-xs'>{curForWeather?.current.temp_f}°F</p>
          </div>
         
        </div>
        <div>
          <img src={`https:${curForWeather?.current.condition.icon}`} alt={curForWeather?.current.condition.text} className='h-16 w-20'/>
          <p className=' text-xs'> {curForWeather?.current.condition.text}</p>
        </div>
      </div>
      <div className='flex flex-row mx-3 text-xs gap-x-4 mt-8 mb-16 md:mx-44'>
        <div>
          <p>Pressure: {curForWeather?.current.pressure_mb}</p>
          <p>Wind: {curForWeather?.current.wind_kph} kph ({curForWeather?.current.wind_dir})</p>
        </div>
        <div>
          <p>Humidity: {curForWeather?.current.humidity}%</p>
          <p>Feels Like: {curForWeather?.current.feelslike_c}°C / {curForWeather?.current.feelslike_f}°F</p>
        </div>
      </div>
      {/*--------------------------------------------- Cards --------------------------------*/}
      <div className='flex gap-y-4 gap-x-2 flex-wrap px-4 md:justify-center md:gap-x-5'>

        {/* <div className='flex bg-sky-700/20 rounded-lg p-2 min-w-40 max-w-40' onClick={(event) => openPopup(event.currentTarget)}> */}
        <div className='flex bg-slate-500 rounded-lg p-2 min-w-40 max-w-40' onClick={() => openPopup('H')}>
            <div>
              {/* <p className='text-xs'> {historyData?.forecast.forecastday[0].date} </p> */}
              <p className='text-xs'> Yesterday </p>
              <div className='flex flex-row'> <p className='font-bold'>  {historyData?.forecast.forecastday[0].day.mintemp_c}/{historyData?.forecast.forecastday[0].day.maxtemp_c}</p> <div className='text-xs'>°C</div> </div>
              <p className='text-xs mt-2 text-wrap'>{historyData?.forecast.forecastday[0].day.condition.text}</p>
            </div>
            <img className='-mt-2 h-12 w-12'  src={`https:${historyData?.forecast.forecastday[0].day.condition.icon}`} alt={`${historyData?.forecast.forecastday[0].day.condition.text}`}  />  
        </div>

        <div className='flex bg-sky-500/60 rounded-lg p-2 min-w-40 max-w-40' onClick={() => openPopup('F',1)} >
          <div>
            {/* <p className='text-xs'> {curForWeather?.forecast.forecastday[0].date} </p> */}
            <p className='text-xs'> Today </p>
            <div className='flex flex-row'> <p className='font-bold'>  {curForWeather?.forecast.forecastday[0].day.mintemp_c}/{curForWeather?.forecast.forecastday[0].day.maxtemp_c}</p> <div className='text-xs'>°C</div> </div>
            <p className='text-xs mt-2 text-wrap'>{curForWeather?.forecast.forecastday[0].day.condition.text}</p>
          </div>
          <img className='-mt-2 h-12 w-12' src={`https:${curForWeather?.forecast.forecastday[0].day.condition.icon}`} alt="" />  
        </div>

        <div className='flex bg-sky-500/40 rounded-lg p-2 min-w-40 max-w-40' onClick={() => openPopup('F2',2)}>
          <div>
            <p className='text-xs'> {curForWeather?.forecast.forecastday[1].date} </p>
            <div className='flex flex-row'> <p className='font-bold'>  {curForWeather?.forecast.forecastday[1].day.mintemp_c}/{curForWeather?.forecast.forecastday[0].day.maxtemp_c}</p> <div className='text-xs'>°C</div> </div>
            <p className='text-xs mt-2 text-wrap'>{curForWeather?.forecast.forecastday[1].day.condition.text}</p>
          </div>
          <img className='-mt-2 h-12 w-12' src={`https:${curForWeather?.forecast.forecastday[1].day.condition.icon}`} alt="" />  
        </div>

        <div className='flex bg-sky-500/40 rounded-lg p-2 min-w-40 max-w-40' onClick={() => openPopup('F3',3)}>
          <div>
            <p className='text-xs'> {curForWeather?.forecast.forecastday[2].date}</p>
            <div className='flex flex-row'> <p className='font-bold'>  {curForWeather?.forecast.forecastday[2].day.mintemp_c}/{curForWeather?.forecast.forecastday[0].day.maxtemp_c}</p> <div className='text-xs'>°C</div> </div>
            <p className='text-xs mt-2 text-wrap'>{curForWeather?.forecast.forecastday[2].day.condition.text}</p>
          </div>
          <img className='-mt-2 h-12 w-12' src={`https:${curForWeather?.forecast.forecastday[2].day.condition.icon}`} alt="" />  
        </div>

      </div>
      {/* <div>
        <img src={`https:${historyData?.forecast.forecastday[0].day.condition.icon}`} alt={`${historyData?.forecast.forecastday[0].day.condition.text}`} />
        <p>{historyData?.forecast.forecastday[0].day.condition.text}</p>
        <p>{historyData?.forecast.forecastday[0].date}</p>
        <p>{historyData?.forecast.forecastday[0].day.maxtemp_c}</p>
        <p>{historyData?.forecast.forecastday[0].day.avgtemp_c}</p>
      </div> */}

      
      {IsPopUpOpen && (
        <div className='bg-slate-950 md:bg-slate-950/90 fixed rounded-xl -m-11 h-auto w-[300px]  md:w-[600px] lg:-m-20 place-self-center overflow-y-auto' onClick={closePopup}>

          {selectedCard?.historyOrForecast === 'H' ? (
            <div>
              <p className='mx-3 md:mx-16 my-4'>{historyData?.forecast.forecastday[0].date}</p>

              <div className='flex justify-between mx-3 md:mx-16'>
                
                <div className='flex max-w-44'>
                  <div>
                    <p className='text-6xl'> {historyData?.forecast.forecastday[0].day.avgtemp_c}</p>
                    <p> {historyData?.forecast.forecastday[0].day.mintemp_c}/{historyData?.forecast.forecastday[0].day.maxtemp_c}</p>
                  </div>
                  <div className='flex flex-col justify-between'>
                    <p>°C</p>
                    <p className='mt-auto mb-10 ml-2'>{historyData?.forecast.forecastday[0].day.avgtemp_f}°F</p>
                  </div>
                
                </div>
                <div>
                  <img src={`https:${historyData?.forecast.forecastday[0].day.condition.icon}`} alt={historyData?.forecast.forecastday[0].day.condition.text} className='h-20 w-24'/>
                  <p className=' text-xs'> {historyData?.forecast.forecastday[0].day.condition.text}</p>
                </div>
              </div>
              <div className='flex flex-row mx-3 text-xs gap-x-4 mt-2 mb-3 md:mx-16'>
                <div>
                  <p>Rain: {historyData?.forecast.forecastday[0].day.daily_chance_of_rain}%</p>  
                  <p>Wind: {historyData?.forecast.forecastday[0].day.maxwind_kph} kph/{historyData?.forecast.forecastday[0].day.maxwind_mph} mph</p>
                </div>
                <div>
                  <p>Avg Humidity: {historyData?.forecast.forecastday[0].day.avghumidity}%</p>
                </div>
              </div>
              <HourlyGraph i={0} Weather={historyData!} />
            </div>
          ) : (
            <div>
              <p className='mx-3 md:mx-16 my-4'>{curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].date}</p>

              <div className='flex justify-between mx-3 md:mx-16'>
                
                <div className='flex max-w-44'>
                  <div>
                    <p className='text-6xl'> {curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.avgtemp_c}</p>
                    <p> {curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.mintemp_c}/{curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.maxtemp_c}</p>
                  </div>
                  <div className='flex flex-col justify-between'>
                    <p>°C</p>
                    <p className='mt-auto mb-10 ml-2'>{curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.avgtemp_f}°F</p>
                  </div>
                
                </div>
                <div>
                  <img src={`https:${curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.condition.icon}`} alt={curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.condition.text} className='h-20 w-24'/>
                  <p className=' text-xs'> {curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.condition.text}</p>
                </div>
              </div>
              <div className='flex flex-row mx-3 text-xs gap-x-4 mt-2 mb-4 md:mx-16'>
                <div>
                  <p>Rain: {curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.daily_chance_of_rain}%</p>  
                  <p>Wind: {curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.maxwind_kph} kph/{curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.maxwind_mph} mph</p>
                </div>
                <div>
                  <p>Avg Humidity: {curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay-1].day.avghumidity}%</p>
                </div>
              </div>
              {/* //Show Hourly GRAPH HERE */}
              {/* {hourlyArray= curForWeather?.forecast.forecastday[selectedCard!.whichForcastDay - 1].hour.map((hourData) =>  hourData.condition.icon */}
              <HourlyGraph i={(selectedCard!.whichForcastDay-1)} Weather={curForWeather!} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;

