var weatherUrl ='https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=edcce0198e0ff90af79e7f1e4745aedf';

var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Arlington,tx,usa&appid=edcce0198e0ff90af79e7f1e4745aedf';


function getApi(weatherUrl) {
    fetch(weatherUrl)
    .then(function (response) {
        console.log(response.status)
        console.log(response.json());
        var useThis = data.main[0].temp;
    })

    .then(function (data){
        console.log(data)
    });
    
    };

getApi(weatherUrl);
