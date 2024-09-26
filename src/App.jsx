import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import clearImage from './Icons/clear.png'
import cloudsImage from './Icons/cloud.png';
import rainImage from './Icons/heavy-rain.png';
import hazeImage from './Icons/haze.png';
import empty from './Icons/empty.png'
import thunder from './Icons/thunder.png'

function App() {
  let [city, setCity] = useState('');
  let [cityDetails, setCityDetails] = useState(null)
  let [isLoding, setIsLoding] = useState(false)
  let key = 'ece5e57a0365fce71d93e9a9f22aef82';

  const getWeatherImages = (condition) => {

    switch (condition) {
      case 'Clear':
        return clearImage
      case 'Clouds':
        return cloudsImage;
      case 'Rain':
        return rainImage;
      case 'Haze':
        return hazeImage;
      case 'thunderstorm':
        return thunder

      default:
        return hazeImage;
    }

  }

  const currentDay = new Date().toLocaleDateString('en-In', { weekday: 'long' })
  const currentDate = new Date().toLocaleDateString('en-In', { day: 'numeric', month: "long", year: 'numeric' })

  let getData = async (event) => {
    event.preventDefault();
    setIsLoding(true)

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    const data = await response.json();

    if (data.cod == '404') {
      setCityDetails(undefined)
    } else {
      setCityDetails(data)
    }

    setIsLoding(false)
    setCity('');
  };


  return (


    <div className="h-[590px] w-[380px] justify-center relative  md:h-[590px] md:w-[900px] backdrop-blur-md bg-black/50 flex shadow-2xl rounded-xl overflow-hidden">
      <img src="https://media.tenor.com/hQz0Kl373E8AAAAi/loading-waiting.gif" alt="" className={` ${isLoding ? '' : 'hidden'}  absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 h-24 z-50`} />
      <div className='w-[50%] relative hidden md:block'>
        <div className='absolute inset-0 h-full w-full bg-black/30 backdrop-blur-0 flex flex-col text-white p-16 justify-between'>

          {cityDetails

            ?
            <>
              <div>
                <h2 className='text-2xl'>{currentDay}</h2>
                <h2 className='text-2xl'>{currentDate}</h2>
              </div>

              <div>
                <h1 className='text-[75px]'>{Math.floor(cityDetails.main.temp)}°C</h1>
                <h2>{cityDetails.name}, {cityDetails.sys.country}</h2>
              </div>

            </>
            :
            <div>
              <h1 className='text-[40px]'></h1>
            </div>
          }

        </div>
        <img className='h-full w-full' src="https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>


      <div className='h-full md:w-[50%] w-[90%] flex flex-col justify-center items-center gap-2 text-white py-2 px-3 text-center overflow-hidden'>

        {cityDetails ? (
          <>
            <img className='h-32' src={getWeatherImages(cityDetails.weather[0].main)} alt="weather icon" />
            <h1 className='text-[35px]'>{cityDetails.weather[0].description}</h1>
          </>
        ) : (
          <>
            <img className='h-32' src={empty} alt="weather icon" />
            <p>No weather data available</p>
          </>

        )}
        <div style={{ height: '2px' }} className=" bg-blue-50 w-[80%] mx-auto mt-4"></div>

        <form onSubmit={getData} className="flex gap-2 mt-3">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search any city"
            className="bg-transparent border-b-2 border-white outline-none px-2"
          />
          <button
            type="submit"
            className="h-7 w-7 bg-white text-black rounded-full flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>


        {cityDetails && (

          <>
            <h2 className='mt-3'>{cityDetails.name}, {cityDetails.sys.country}</h2>
            <div style={{ height: '0.1px' }} className="bg-blue-50 w-[70%] mx-auto mt-3"></div>
            <div className='flex justify-between items-center w-[60%]'>
              <h2>Temperature</h2>
              <h2>{Math.floor(cityDetails.main.temp)}°C</h2>
            </div>

            <div style={{ height: '0.1px' }} className="bg-blue-50 w-[70%] mx-auto "></div>

            <div className='flex justify-between items-center w-[60%]'>
              <h2>Humidity</h2>
              <h2>{cityDetails.main.humidity}%</h2>
            </div>

            <div style={{ height: '0.1px' }} className="bg-blue-50 w-[70%] mx-auto "></div>

            <div className='flex justify-between items-center w-[60%]'>
              <h2>Visilblity</h2>
              <h2>{cityDetails.visibility}</h2>

            </div>

            <div style={{ height: '0.1px' }} className="bg-blue-50 w-[70%] mx-auto "></div>

            <div className='flex justify-between items-center w-[60%]'>
              <h2>Wind Speed</h2>
              <h2>{cityDetails.wind.speed} Km/h</h2>
            </div>
          </>
        )}
      </div>
    </div>

  )
}

export default App
