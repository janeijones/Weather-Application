var geocodeURL = 'https://api.openweathermap.org/geo/1.0/direct?q=London,us&limit=2&appid=edcce0198e0ff90af79e7f1e4745aedf';
var wUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.8865&lon=-83.4483&exclude=hourly,minutely&units=imperial&appid=edcce0198e0ff90af79e7f1e4745aedf';
var key = 'edcce0198e0ff90af79e7f1e4745aedf' 
var cityNameEl = document.querySelector('#city-name')
var weatherIcon = document.querySelector('#weather-icon')
var cityTempEl = document.querySelector('#city-temp')
var cityHumidEl = document.querySelector('#city-humidity')
var cityWindEl = document.querySelector('#city-wind')
var cityUviEl = document.querySelector('#city-uvi')
var cityUviValEl = document.querySelector('#index-val')
var fiveDayForecastEl = document.querySelector('#five-day-forecast')
var fiveDayTitleEl = document.querySelector('#five-day-title')




function getGeoData (geoApi) {
    fetch(geoApi)
     .then (function (response){
         if (response.ok) {
             response.json().then(function (data) {
                cityName = data[0].name;
                var lat = data[0].lat;
                var lon = data[0].lon;
                console.log(lat, lon)
               
                var date = moment().format('MM/DD/YY');
            cityNameEl.innerHTML = cityName + " " + date;
                return lat, lon; 

             })
         }
     })
};


function getWeather (lat, lon) {
    var wApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly.minutely&units=imperial&appid=' + key; 
    


    fetch(wUrl)
     .then (function (response){
        if (response.ok) {
            response.json().then(function (data){
                var currentTemp = parseInt(data.current.temp);
                var humidity = data.current.humidity; 
                var uvi = data.current.uvi; 
                var windSpeed = parseInt(data.current.wind_speed);
                var icon = data.current.weather[0].icon; 
                    

                
                weatherIcon.setAttribute("src", 'http://openweathermap.org/img/w/' + icon + '.png'); 

                cityTempEl.innerHTML = "Temperature: " + currentTemp + " F";

                cityHumidEl.innerHTML = "Humidity: " + humidity + " %";

                cityWindEl.innerHTML = "Wind: " + windSpeed + " MPH"; 

    

                    if (uvi === null) {
                        cityUviEl.innerHTML = "UV Index: 0";
                    } else {
                        
                            
                            if (uvi <= 2)
                            {
                                cityUviEl.classList.add('bs-success')
                                cityUviEl.innerHTML = "UV Index: " + uvi
                                console.log(uvi)
                                console.log("sucess")
                            }
                            else if (uvi >= 3 && uvi <= 7)
                            {
                                cityUviEl.innerHTML = "UV Index: " + uvi
                                
                                cityUviEl.classList.add('bg-danger')
                                console.log("medium uvi")
                            }
                            else 
                            {
                                cityUviEl.innerHTML = "UV Index: " + uvi
                                
                                cityUviEl.classList.add('bg-danger')
                                console.log("4rd option")
                            }
                        }
                    
                        var fiveDayTitle = document.createElement("h1")
                        fiveDayTitle.innerHTML = ("5 Day Forecast")
                        fiveDayTitleEl.appendChild(fiveDayTitle);
                        
                        
                        for (var i = 0; i < 5; i++)
                        {
                        var futureDayEl = document.createElement('div');
                        futureDayEl.classList.add('future-forecast')
                        var futureDate = moment().add([i], 'days').format('MM/DD/YY');
                        var futureTemp = parseInt(data.daily[i].temp.max);
                        var futureHumidity = parseInt(data.daily[i].humidity)           
                        var futureWeatherIcon = document.createElement('img')
                        futureWeatherIcon.setAttribute("src", 'http://openweathermap.org/img/w/' + data.daily[0].weather[0].icon + '.png');
                        
                        futureDayEl.textContent = futureDate;
                        fiveDayForecastEl.appendChild(futureDayEl)
                        fiveDayForecastEl.appendChild(futureWeatherIcon)
                         
                        var futureTempEl = document.createElement('p');
                        futureTempEl.textContent = "Temp: " + futureTemp;
                        fiveDayForecastEl.appendChild(futureTempEl);

                        var futureHumidityEl = document.createElement('p');
                        futureHumidityEl.textContent = "Humidity: " + futureHumidity;
                        fiveDayForecastEl.appendChild(futureHumidityEl);
                        }

                        
                        
                        // futureDayEl.textContent = parseInt(data.daily[i].temp.max);
                        // fiveDayForecastEl.appendChild(futureDayEl);

                        
                        
    
  

                        // FiveDayForecaseEl.classList.add('future-forecast')
            
                            //  var temp = parseInt(data.daily[i].temp.max) 
                            //  console.log(temp)
                            //  fiveDayForecastEl.appendChild(futureDay); 
                            //  console.log(futureDay);//day 1

                            //  futureDay.innerHTML = data.daily[i].temp.max
                            //  fiveDayForecastEl.appendChild(futureDay); 
                            //  console.log(futureDay)//day 2
                            //  futureDay.innerHTML = data.daily[i].weather[0].icon // icons are strings
                            //  fiveDayForecastEl.appendChild(futureDay);
                            //  console.log(futureDay)
                        
                            // fiveDayForecastEl.appendChild(futureDay); 
                        // }        

        



        })//end of response.json, and function args
    } //end of (if reponse.ok)
}) //end of orginal promise with function args

} //end of get weather api function 

    


getWeather(getGeoData(geocodeURL));