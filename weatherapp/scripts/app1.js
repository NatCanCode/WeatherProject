const openCageApi = "https://api.opencagedata.com/geocode/v1/json";
const openCageApiKey = "82a6b05eeac74093b3cec2c1c1018c9f"; 

document.getElementById("city-form").addEventListener("submit", function(e) {
    e.preventDefault();
    httpGet($("#city-name-input").val());
})

function displayData(data) {
    let lat = data.results[0].geometry.lat;
    let lon = data.results[0].geometry.lng;
    getWeather(lat, lon);
}

function httpGet(search) {
    $.get("https://api.opencagedata.com/geocode/v1/json?key=82a6b05eeac74093b3cec2c1c1018c9f&q="+search, function (data) {
        displayData(data);
    })
}

function getWeather(lat, lon) {
    // console.log("lat/long =>", lat, lon);
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall",
        method: "GET",
        data: {
            "lat": lat,
            "lon": lon,
            "units": "metric",
            "appid": "605183d38a62dbf11efa3792592ad0ba"
        },
        dataType: "json",
        statusCode: {
            200: function(response) {
                console.log("response => ", response);
                                
                let dt = response.current.dt
                console.log("dt ", dt);
                let timezone = dt + response.current.timezone_offset; //needs to be converted in minutes 
                console.log("timezone ", timezone);
                const timezoneInMinutes = (timezone / 60) * 1000;
                console.log("timezoneInMintes ", timezoneInMinutes);
                const currentLocalTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");
                console.log("currentLocalTime ", currentLocalTime); 
                console.log("??? =>", timezoneInMinutes, dt, currentLocalTime);
                $(".local-time").html(currentLocalTime);

                // let dt = response.current.dt; // unix timestamp in seconds
                // let timezone = response.current.timezone_offset; // timezone needs to be converted in minutes 
                // const timezoneInMinutes = timezone / 60;
                // const currTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");
                // let currentLocalTime = moment.unix(dt).utc().add(timezone * timezone).format("h:mm A");
                // console.log("dt =>", dt, currentLocalTime);

                // const LocalTime = new Date((dt + timezone) * 1000);
                // console.log("local time???? ", LocalTime);

                $(".local-time").html(currentLocalTime);
                $(".temperature").html(parseInt(response.current.temp)+" °C");
                $(".description").html(response.current.weather[0].description);
                    
                let weatherId = response.current.weather[0].id;
                let weatherPic = response.current.weather[0].main;
                weatherIcons(weatherPic, weatherId);
                // sunsetMode();
                // SunRiseSet();

                let sunrise = response.current.sunrise;
                let sunset = response.current.sunset;
                // let timezone = response.current.timezone_offset;
                if (dt > sunset && dt < sunrise) {
                //  Or if (dt + timezone > sunset + timezone && dt + timezone < sunrise + timezone) {
                    $("body").removeClass("light").addClass("dark");    
                } else {
                    $("body").removeClass("dark").addClass("light"); 
                }
            },
            402: function() {
                console.log("hit free trial daily limit");
            }
        }
    })
}

//Grab day of the week from local computer
let date = new Date();
let dayOfWeekNumber = date.getDay();
let nameOfDay;

switch(dayOfWeekNumber) {
    case 0: 
        nameOfDay = 'Sunday';
        break;
    case 1:
        nameOfDay = 'Monday';
        break;
    case 2:
        nameOfDay = 'Tuesday';
        break;
    case 3:
        nameOfDay = 'Wednesday';
        break;
    case 4:
        nameOfDay = 'Thursday';
        break;
    case 5:
        nameOfDay = 'Friday';
        break;
    case 6:
        nameOfDay = 'Saturday';
        break;
}
//Display the day of the week
let weekdayDiv = document.getElementById('weekday');
weekdayDiv.innerHTML = `${nameOfDay}`;


function weatherIcons(current, weatherId) {
    let imgSrc = "../images/";
        switch (current) {
            case "Clear":
                imgSrc = imgSrc + "sun-white.png"
                break;
            case "Snow":
                imgSrc = imgSrc + "snow-white.png"
              break;
            case "Clouds":
                // if > 50% clouds:
                // console.log(weatherId);
                if (weatherId == "801" || weatherId == "802") {
                    imgSrc = imgSrc + "cloudy-white.png"
                } else if (weatherId == "803" || weatherId == "804") {
                    imgSrc = imgSrc + "clouds-white.png"
                }
                break;
            default:
                imgSrc = imgSrc + "rain-white.png"
                break;
        }
        let image = document.getElementById("icon");
        image.src = imgSrc;
        let visible = document.getElementById("weather-icons");
        visible.style.display = "block"
}

// change status between day1 to Day7
// $("#days").change(function() {

// })

// change light to dark mode according to hour
// insert dt in here to get local time?
// let sunrise = response.daily[0].dt.sunrise
// let sunset = response.daily[0].dt.sunset
// $(function() {
//     let hour = (new Date).getHours();
//     if (hour >= 20) {
//         $("body").removeClass("light").addClass("dark");    
//     } else {
//         $("body").removeClass("dark").addClass("light"); 
//     }
// })


// d = new Date()
// console.log(new Date());
// localTime = d.getTime()
// localOffset = d.getTimezoneOffset() * 60000
// utc = localTime + localOffset
// var atlanta = utc + (1000 * -14400)
// nd = new Date(atlanta)
// console.log(new Date(atlanta));


// function sunsetMode(response) {
//     let sunrise = response.current.sunrise
//     let sunset = response.current.sunset
//     if (sunset) {
//         $("body").removeClass("light").addClass("dark");    
//     } else {
//         $("body").removeClass("dark").addClass("light"); 
//     }
// }


// function SunRiseSet() {
//     let responseSunset = UrlFetchApp.fetch("https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+long+"&date="+today);
//     let json = responseSunSet.getContentText();
//     let data = JSON.parse(json);
//     let sunrise = data.results.sunrise;
//     let sunset = data.results.sunset;
//     if (type == 1) {
//       return sunrise;
//     } else {
//       return sunset;
//     };
// }

// https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today


