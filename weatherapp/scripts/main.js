
const openCageApi = "https://api.opencagedata.com/geocode/v1/json";
// const openCageApiKey = "3d9a08edcbde453abe82b331ddcbeb02";
const openCageApiKey = "82a6b05eeac74093b3cec2c1c1018c9f"; 

const openWeatherMap = "https://api.openweathermap.org/data/2.5/onecall"
// const openWeatherMapKey = "01441c708e63a5e97a92f4860b03c07f";
const openWeatherMapApiKey ="605183d38a62dbf11efa3792592ad0ba";

// FONCTION PRINCIPALE = MANAGER
// ma fonction qui se lance a l'ouverture de la page sur le click du submit

$(document).ready(function() {
    $('form')
    $('#city-form').submit(function(e) {
        e.preventDefault();
        const cityName = document.getElementById('city-input-submit').value;
        const geoloc = getGeoloc(cityName);
        const weather = getWeather(geoloc);
        console.log(weather)
        //display5days(weather)
        displayCurrentWeather(weather.current)
        displayDay()

    });
});

function displayCurrentWeather(current) {
let imgSrc = '../images/';
    switch (current.weather[0].main) {
        case 'Clear':
            imgSrc = imgSrc +  "sun-white.png"
            break;
        case 'Snow':
            imgSrc = imgSrc + "snow-white.png"
          break;
        case 'Clouds':
            imgSrc = imgSrc + "clouds-white.png"
            break;
        case 'Cloudy':
            imgSrc = imgSrc + "cloudy-white.png"
            break;
        default:
            imgSrc = imgSrc + "rain-white.png"
            break;

    }
    let image = document.getElementById("icon");
    image.src = imgSrc;
    let visible = document.getElementById("weather-icons")
    visible.style.display = "block"
    console.log(visible);
}

// function weatherIcons(current, weatherId) {
//     let imgSrc = "./images/";
//         switch (current) {
//             case "Clear":
//                 imgSrc = imgSrc + "sun-white.png"
//                 break;
//             case "Snow":
//                 imgSrc = imgSrc + "snow-white.png"
//               break;
//             case "Clouds":
//                 // if > 50% clouds:
//                 console.log(weatherId);
//                 if (weatherId == "801" || weatherId == "802") {
//                     imgSrc = imgSrc + "cloudy-white.png"
//                 } else if (weatherId == "803" || weatherId == "804") {
//                     imgSrc = imgSrc + "clouds-white.png"
//                 }
//                 break;
//             default:
//                 imgSrc = imgSrc + "rain-white.png"
//                 break;
//         }
//         let image = document.getElementById("icon");
//         image.src = imgSrc;
//         let visible = document.getElementById("weather-icons");
//         visible.style.display = "block"
//         console.log(visible);
// }

function displayDay(){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayIndex = new Date();
    dayIndex = dayIndex.getDay();
    let day = document.getElementById('my_day')
    day.innerText = days[dayIndex]
    console.log('coucou: ', days[dayIndex]);

}

// requête http récupération de la géoloc de la ville (valeur de mon input)

function getGeoloc(city) {
    var formatedUrl = openCageApi + "?q=" + city + "&key=" + openCageApiKey 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", formatedUrl, false); // false for synchronous request
    xmlHttp.send( null );
    var coordonnées = JSON.parse(xmlHttp.responseText).results[0].geometry
    return coordonnées;
}

// requête http récupération de la météo par rapport aux coordonnées de la ville.
function getWeather(lat_lng) {
    // formatage de l'url
    var weatherURL = openWeatherMap + "?lat=" + lat_lng.lat + "&lon=" + lat_lng.lng + "&appid=" + openWeatherMapApiKey
    var weatherRequest = new XMLHttpRequest();
    weatherRequest.open( "GET", weatherURL, false);
    weatherRequest.send( null );
    var weatherData = JSON.parse(weatherRequest.responseText)
    return weatherData;
}