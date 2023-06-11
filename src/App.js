import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [cityName, setCityName] = useState("");
  const [city, setcity] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [description, setDescription] = useState("");
  const [mintemp, setminTemp] = useState("");
  const [maxtemp, setmaxTemp] = useState("");

  

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0336380060bfd5eb16732502b38f1fcb&units=metric`
      )
      .then((response) => {
        console.log("response: ", response.data);

        setcity(response.data.name);
        setCurrentTemp(Math.round(response.data.main.temp));
        setDescription(response.data.weather[0].description);
        setminTemp(response.data.main.temp_min);
        setminTemp(Math.round(response.data.main.temp_min));
        setmaxTemp(Math.round(response.data.main.temp_max));
        

      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };
  return (
    <div className="container">
      <div className="weatherApp">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            required
            placeholder="Enter your city name"
            onChange={(e) => {
              setCityName(e.target.value);
            }}
          />
          <button type="submit">Check</button>
        </form>
        {
       
       (currentTemp && mintemp && maxtemp === null) ? null :
      <div>
       <div id="cityName">{city}</div>
       <div id="currentTemp">{(currentTemp)}°C</div>
       <div id="description">{description}</div>
       <div id="min-max">
       <div>{(mintemp)}°C /</div>
       <div>{(maxtemp)}°C</div>
       </div>
       </div>

        }
      </div>
    </div>
  );
}

export default App;
