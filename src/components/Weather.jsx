import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './Weather.module.scss';

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [loaded, isLoaded] = useState(false);
  const [errormes, setErrormes] = useState(false);
  const location = 'Chelyabinsk';
  const api = `http://api.weatherapi.com/v1/current.json?key=6f82136fec71416b8f6113446220406&&q=${location}&aqi=no`;

  const searchLocation = () => {
    isLoaded(true);
    const resp = axios
      .get(api)
      .then((res) => {
        setWeather(res);
      })
      .catch((e) => setErrormes(true));
    isLoaded(false);
    setErrormes(false);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.top}>
          <div className={style.location}>
            {weather.location ? <p>{weather.location.name}</p> : null}
          </div>
          <div className={style.temp}>
            {weather.current ? (
              <h1>{Math.ceil(weather.current.temp_c)} °C</h1>
            ) : null}
          </div>
          <div className={style.description}>
            {weather.current ? <p>{weather.current.condition.text}</p> : null}
          </div>
        </div>
        <div className={style.bottom}>
          <div className={style.feels}>
            {weather.current ? (
              <p className={style.bold}>
                {Math.ceil(weather.current.feelslike_c)} °C
              </p>
            ) : null}

            <p>Feels like</p>
          </div>
          <div className={style.humidity}>
            {weather.current ? (
              <p className={style.bold}>{weather.current.humidity} %</p>
            ) : null}

            <p>Humidity</p>
          </div>
          <div className={style.wind}>
            {weather.current ? (
              <p className={style.bold}>{weather.current.wind_kph} kph</p>
            ) : null}
            <p>Wind speed</p>
          </div>
        </div>
      </div>
      <div>
        <div className='px-4 py-2 mt-10 text-center mx-auto bg-sky-300  rounded-lg max-w-[200px]'>
          <button disabled={loaded} onClick={searchLocation}>
            click me
          </button>
        </div>
      </div>
      {errormes && <div>Error</div>}
    </>
  );
};

export default Weather;
