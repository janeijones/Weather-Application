var searchBtnEl = document.querySelector("#search-button");
var cityListEl = document.querySelector("#city-list");
var cityInput = document.querySelector('#city-text');
var citySearchForm = document.querySelector('#city-input');
var cities = [];
var openWeatherApi = 'https://api.openweathermap.org/data/2.5/weather?';
var futureWeatherApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=';
var apiKey = '&appid=edcce0198e0ff90af79e7f1e4745aedf';
var cityTempEl = document.querySelector('#city-temp');
var cityNameEl = document.querySelector('#city-name');
var cityHumidEl = document.querySelector('#city-humidity');
var cityWindEl = document.querySelector('#city-wind');
var cityUvEl = document.querySelector('#city-uv');
var weatherIcon = document.querySelector('#weather-icon');
var cardEl = document.querySelector('.card')
var imgEl


function renderCityList(){

    cityListEl.innerHTML = "";
    
    for (var i=0; i<cities.length; i++) {
        var city = cities[i];
        var li = document.createElement("li");
        li.textContent = city;
        li.classList.add("list-group-item");
        li.setAttribute("data-index", i);
        
        cityListEl.appendChild(li);
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

searchBtnEl.addEventListener("click", function(event) {
    var cityText = cityInput.value.trim();

    if (cityText === ""){
        return;
    }

    cities.push(cityText);
    cityInput.value = "";

    storeCityList();
    renderCityList();
    
});

citySearchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var cityText = cityInput.value.trim();

    if (cityText === ""){
        return;
    }

    cities.push(cityText);
    cityInput.value = "";

    storeCityList();
    renderCityList();

    var cityApi = openWeatherApi + "q=" + cityText + "&units=imperial" + apiKey; 
    console.log(cityApi);
    getCityApi(cityApi);   
});




var weatherUrl ='https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=edcce0198e0ff90af79e7f1e4745aedf';
// var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Arlington,tx,usa&units=imperial&appid=edcce0198e0ff90af79e7f1e4745aedf';

function getCityInfo (data){
    var date = moment().format('MM/DD/YY');

        cityNameEl.innerHTML = data.name + " " + date;
        weatherIcon.setAttribute("src", 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png'); 

        cityTempEl.innerHTML = "Temperature: " + data.main.temp + " F";

        cityHumidEl.innerHTML = "Humidity: " + data.main.humidity + " %";

        cityWindEl.innerHTML = "Wind: " + data.wind.speed + " MPH";

        var lat = data.coord.lat;
        var lon = data.coord.lon; 

        var weatherApi = futureWeatherApi + lat + "&lon=" + lon + "&exclude=alerts" + "&units=imperial" + apiKey;

        
        getFiveDayForecast(weatherApi);
}

function getFiveDayForecast(weatherApi){
    fetch(weatherApi)
    .then(function (response){
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
               
               if (data.current.uvi === null) {
                cityUvEl.innerHTML = "UV Index: 0";
                $(cityUvEl).attr('class', '.bs-sucess');
               } else 
               {
                    
                    if (data.current.uvi <= 2)
                    {
                        $(cityUvEl).attr('class', '.bs-sucesss')
                        cityUvEl.innerHTML = "UV Index: " + data.current.uvi;
                        console.log("but not here")
                    }
                    else if (data.current.uvi >= 3 && data.current.uvi <= 7)
                    {
                        cityUvEl.innerHTML = "UV Index: " + data.current.uvi;
                        $(cityUvEl).attr('class', '.bs-warning') 
                    }
                    else 
                    {
                        cityUvEl.innerHTML = "UV Index: " + data.current.uvi;
                        $(cityUvEl).attr('class', '.bs-danger')
                    }
                }

                var i = 1;

                var cardEl = document.querySelector('#future-forecast-1')
                var imgEl = document.querySelector('#one')
                var h4El = document.querySelector('#temp')
                {
                    var futureDate = moment().add([i], 'days').format('MM/DD/YY');
                    i++
                    cardEl.innerHTML = futureDate;

                    // // imgEl.setAttribute("src", 'http://openweathermap.org/img/wn/' + data.hourly.weather.icon + '.png');
                    // cardEl.innerHTML = futureDate
                    // // cardEl.innerHTML = futureDate + data.hourly[0].temp;  + imgEl;

                    
                
                }

                var cardEl = document.querySelector('#future-forecast-2')
                {
                    var futureDate = moment().add([i], 'days').format('MM/DD/YY');
                    i++
                    cardEl.innerHTML = futureDate;
                }
                var cardEl = document.querySelector('#future-forecast-3')
                {
                    var futureDate = moment().add([i], 'days').format('MM/DD/YY');
                    i++
                    cardEl.innerHTML = futureDate;
                }
                
                var cardEl = document.querySelector('#future-forecast-4')
                {
                    var futureDate = moment().add([i], 'days').format('MM/DD/YY');
                    i++
                    cardEl.innerHTML = futureDate;
                }
                
                var cardEl = document.querySelector('#future-forecast-5')
                {
                    var futureDate = moment().add([i], 'days').format('MM/DD/YY');
                    i++
                    cardEl.innerHTML = futureDate;
                }
                
            
} )}
});

} 





function getCityApi(cityUrl) {
    fetch(cityUrl)
    .then(function (response) {
    if (response.ok){
        response.json().then(function (data){
        // console.log(data)
        // console.log(data.main.temp);
       
        getCityInfo(data);
        

        
    });
    
    } else {
        alert('Error');
    };

})
};



loadCityList(); // calls loadCityList function to retrieve saved cities from localStorage and load on page 