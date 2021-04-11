var searchBtnEl = document.querySelector("#search-button");
var cityListEl = document.querySelector("#city-list");
var cityInput = document.querySelector('#city-text');
var citySearchForm = document.querySelector('#city-input');
var cities = [];

var geocodeURL = 'https://api.openweathermap.org/geo/1.0/direct?q=London,us&limit=2&appid=edcce0198e0ff90af79e7f1e4745aedf';
var wUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.8865&lon=-83.4483&exclude=hourly,minutely&units=imperial&appid=edcce0198e0ff90af79e7f1e4745aedf';
var apiKey = '&appid=edcce0198e0ff90af79e7f1e4745aedf'
var cityNameEl = document.querySelector('#city-name')
var weatherIcon = document.querySelector('#weather-icon')
var cityTempEl = document.querySelector('#city-temp')
var cityHumidEl = document.querySelector('#city-humidity')
var cityWindEl = document.querySelector('#city-wind')
var cityUviEl = document.querySelector('#city-uvi')
var cityUviValEl = document.querySelector('#index-val')
var fiveDayForecastEl = document.querySelector('#five-day-forecast')
var fiveDayTitleEl = document.querySelector('#five-day-title')


function renderCityList() {

    cityListEl.innerHTML = "";
    cityArray = [];

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        cityArray.push(city);
        var li = document.createElement("li");
        li.textContent = city;
        li.classList.add("list-group-item");
        li.setAttribute("data-index", i);

        cityListEl.appendChild(li);
    }

    var items = cityListEl.getElementsByTagName("li");
    console.log(cityArray)
    
    for (var j = 0; j < items.length; ++j) {
        
    }
}



function storeCityList() {
    localStorage.setItem("cities", JSON.stringify(cities));
}


function loadCityList() {  //function retrieves city list from local storage, runs on page load
    var storedCities = JSON.parse(localStorage.getItem("cities"))

    if (storedCities !== null) { // if data is located in local storage, update cities array 
        cities = storedCities;
    }

    renderCityList(); //calls renderCityList function to load cities array on page
}

searchBtnEl.addEventListener("click", function (event) {
    var cityText = cityInput.value.trim();

    if (cityText === "") {
        return;
    }

    cities.push(cityText);
    cityInput.value = "";

    storeCityList();
 

    var geoCodeApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityText + ",us&limit=2" + apiKey;
    getGeoData(geoCodeApi);

});

citySearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityText = cityInput.value.trim();

    if (cityText === "") {
        return;
    }

    cities.push(cityText);
    cityInput.value = "";

    storeCityList();
    

    var geoCodeApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityText + ",us&limit=2" + apiKey;
    getGeoData(geoCodeApi);
});


function getGeoData(geoApi) {
    return fetch(geoApi)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    cityName = data[0].name;
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    console.log(lat, lon)

                    var date = moment().format('MM/DD/YY');
                    cityNameEl.innerHTML = cityName + " " + date;
                    getWeather(lat, lon)

                })
            }
        })
};


function getWeather(lat, lon) {
    console.log(lat + "lat")
    console.log(lon + "lon")
    var wApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&units=imperial' + apiKey;


    fetch(wApi)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
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


                        if (uvi <= 2) {
                            cityUviEl.classList.add('bs-success')
                            cityUviEl.innerHTML = "UV Index: " + uvi
                            console.log(uvi)
                            console.log("sucess")
                        }
                        else if (uvi >= 3 && uvi <= 7) {
                            cityUviEl.innerHTML = "UV Index: " + uvi

                            cityUviEl.classList.add('bg-danger')
                            console.log("medium uvi")
                        }
                        else {
                            cityUviEl.innerHTML = "UV Index: " + uvi

                            cityUviEl.classList.add('bg-danger')
                            console.log("4rd option")
                        }
                    }

                    var fiveDayTitle = document.createElement("h1")
                    fiveDayTitle.innerHTML = ("5 Day Forecast")
                    fiveDayTitleEl.appendChild(fiveDayTitle);


                    for (var i = 0; i < 5; i++) {
                        var futureDayEl = document.createElement('div');
                        futureDayEl.classList.add('card')

                        var forecastBodyEl = document.createElement('div');
                        forecastBodyEl.classList.add('card-body')

                        var futureDate = moment().add([i], 'days').format('MM/DD/YY');
                        var futureTemp = parseInt(data.daily[i].temp.max);
                        var futureHumidity = parseInt(data.daily[i].humidity)
                        var futureWeatherIcon = document.createElement('img')
                        futureWeatherIcon.setAttribute("src", 'http://openweathermap.org/img/w/' + data.daily[0].weather[0].icon + '.png');

                        var iconDivEl = document.createElement('div')
                        iconDivEl.setAttribute('id', 'iconDiv')
                        iconDivEl.appendChild(futureWeatherIcon)
                        futureWeatherIcon.setAttribute("class", "img-fluid")

                        forecastBodyEl.textContent = futureDate;
                        futureDayEl.appendChild(forecastBodyEl);

                        futureDayEl.appendChild(iconDivEl);

                        var futureTempEl = document.createElement('p');
                        futureTempEl.textContent = "Temp: " + futureTemp;
                        futureDayEl.appendChild(futureTempEl);

                        var futureHumidityEl = document.createElement('p');
                        futureHumidityEl.textContent = "Humidity: " + futureHumidity;
                        futureDayEl.appendChild(futureHumidityEl);

                        fiveDayForecastEl.appendChild(futureDayEl)
                    }

                })//end of response.json, and function args
            } //end of (if reponse.ok)
        }) //end of orginal promise with function args

} //end of get weather api function 


loadCityList();