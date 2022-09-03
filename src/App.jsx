import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'


function App() {
  const [data, setData] = useState({})
  const [isCelcius, setIsCelcius] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
      const crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=bcba9fde283255a69f7c2cf51a4a2005`)
        .then(res => setData(res.data))
    }


  }, []);

  

   if (data.weather?.[0].main === "Thunderstorm") {
     document.body.style.background = `url(${"https://img.freepik.com/foto-gratis/primer-plano-ventana-dia-lluvioso-gotas-lluvia-rodando-ventana_181624-21644.jpg?w=1380&t=st=1662172074~exp=1662172674~hmac=88cf7a74f28dc018d5a7a3b14e3109daa9b89fec21ac440802c2ac6302b75d91"})`
   } else if (data.weather?.[0].main === "Clear") {
     document.body.style.background = `url(${"https://notife.com/wp-content/uploads/2020/04/Santa-Fe.jpg"})`
   } else if (data.weather?.[0].main === "Snow") {
     document.body.style.background = `url(${"https://www.rionegro.com.ar/wp-content/uploads/2020/06/Bche-Nieve-11-2.jpg"})`
   } else if (data.weather?.[0].main === "Drizzle") {
     document.body.style.background = `url(${"https://www.lavanguardia.com/files/image_948_465/uploads/2022/06/15/62a9881a227b9.jpeg"})`

   } else if (data.weather?.[0].main === "Rain") {
     document.body.style.background = `url(${"https://uploads.vibra.co/1/2021/09/sonar-con-lluvia-fuerte.jpg"})`

   } else if (data.weather?.[0].main === "Clouds") {
     document.body.style.background = `url(${"https://chacotodoeldia.com/wp-content/uploads/2022/08/625bf61b3cb26.jpg"})`

   }
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize= "cover";

  return (
    <>
      <div className='container'>
        <h1 className='tittle'>Wheather App</h1>
        <div className='ubication'>
          <p className='text'>{data.name},</p>
          <p className='text-country'>{data.sys?.country}</p>
        </div>
        <img className='img' src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}.png`} alt="" />
        <div className='temp'>
          <p className='text'>{isCelcius ? `${data.main?.temp - 273.15}C°` : `${data.main?.temp}F°`}</p>
          <button className='btn' onClick={() => setIsCelcius(!isCelcius)}>C°/F°</button>
        </div>
        <p className='text'>Visibility: {data.visibility} meters</p>
        <p className='text'>Humidity: {data.main?.humidity}%</p>

      </div>
    </>
  )
}

export default App
