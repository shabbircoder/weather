// import './App.css';
// import { Search, MapPin, Wind } from 'react-feather';
// import getWeather from './api/api';
// import { useState } from 'react';
// import dateFormat from 'dateformat';

// function App() {

//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState({});
//   const [recentSearches, setRecentSearches] = useState([]);

//   const getWeatherbyCity = async () => {
//     const weatherData = await getWeather(city);
//     setWeather(weatherData);

//     // Update recent searches
//     setRecentSearches(prevSearches => {
//       const updatedSearches = [city, ...prevSearches.filter(search => search !== city)];
//       return updatedSearches.slice(0, 3); // Limit to 5 recent searches
//     });

//     setCity("");
//   }

//   const handleRecentSearchClick = async (searchCity) => {
//     const weatherData = await getWeather(searchCity);
//     setWeather(weatherData);
//     setCity("");
//   }

//   const renderDate = () => {
//     let now = new Date();
//     return dateFormat(now, "dddd, mmmm dS, h:MM TT");
//   }

//   return (
//     <div className="app">
//       <h1>Weather App</h1>
//       <div className="input-wrapper">
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder='Enter City Name'
//         />
//         <button onClick={getWeatherbyCity}>
//           <Search />
//         </button>
//       </div>

//       {recentSearches.length > 0 && (
//         <div className="recent-searches">
//           <h4>Recent Searches:</h4>
//           <ul>
//             {recentSearches.map((search, index) => (
//               <li key={index} onClick={() => handleRecentSearchClick(search)}>
//                 {search}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {weather && weather.weather ? (
//         <div className="content">
//           <div className="location d-flex">
//             <MapPin />
//             <h2>{weather.name} <span>({weather.sys.country})</span></h2>
//           </div>
//           <p className="datetext">{renderDate()}</p>

//           <div className="weatherdesc d-flex flex-c">
//             <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
//             <h3>{weather.weather[0].description}</h3>
//           </div>

//           <div className="tempstats d-flex flex-c">
//             <h1>{weather.main.temp} <span>&deg;C</span></h1>
//             <h3>Feels Like {weather.main.feels_like} <span>&deg;C</span></h3>
//           </div>

//           <div className="windstats d-flex">
//             <Wind />
//             <h3>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
//           </div>
//         </div>
//       ) : (
//         <div className="content">
//           <h4>No Data found!</h4>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import './App.css';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './api/api';
import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches'));
    if (storedSearches) {
      setRecentSearches(storedSearches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);

    // Update recent searches
    setRecentSearches(prevSearches => {
      const updatedSearches = [city, ...prevSearches.filter(search => search !== city)];
      return updatedSearches.slice(0, 3); // Limit to 3 recent searches
    });

    setCity("");
  }

  const handleRecentSearchClick = async (searchCity) => {
    const weatherData = await getWeather(searchCity);
    setWeather(weatherData);
    setCity("");
  }

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter City Name'
        />
        <button onClick={getWeatherbyCity}>
          <Search />
        </button>
      </div>

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h4>Recent Searches:</h4>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index} onClick={() => handleRecentSearchClick(search)}>
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}

      {weather && weather.weather ? (
        <div className="content">
          <div className="location d-flex">
            <MapPin />
            <h2>{weather.name} <span>({weather.sys.country})</span></h2>
          </div>
          <p className="datetext">{renderDate()}</p>

          <div className="weatherdesc d-flex flex-c">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <h3>{weather.weather[0].description}</h3>
          </div>

          <div className="tempstats d-flex flex-c">
            <h1>{weather.main.temp} <span>&deg;C</span></h1>
            <h3>Feels Like {weather.main.feels_like} <span>&deg;C</span></h3>
          </div>

          <div className="windstats d-flex">
            <Wind />
            <h3>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
          </div>
        </div>
      ) : (
        <div className="content">
          <h4>No Data found!</h4>
        </div>
      )}
    </div>
  );
}
export default App;





