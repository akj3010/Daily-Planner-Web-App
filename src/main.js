const dayjs = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat')
//import dayjs from 'dayjs' // ES 2015
dayjs.extend(localizedFormat);


setDateTime = () => {
    let curTime = Date();
    const dateElement = document.getElementById("date");
    dateElement.innerText = dayjs(curTime).format('dddd, D MMMM YYYY');

    const timeElement = document.getElementById("time");
    timeElement.innerText = dayjs(curTime).format('LTS');

    // console.log(dayjs(curTime).format('llll'));
}


findLocation = () => {
    const locationElement = document.getElementById("location");

    success = (position) => {
        //console.log(position);
        
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoAPIURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

        fetch(geoAPIURL)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            const countryName = data.countryName;
            const locality = data.locality;

            locationElement.innerText = `${locality}, ${countryName}`


        })

        //locationElement.innerText = position
        

    }

    error = () => {
        locationElement.innerText = "Unable to retrieve location";

    }

    navigator.geolocation.getCurrentPosition(success, error);

}


setWeather = () => {
    const tempElement = document.getElementById("temp");
    const weatherElement = document.getElementById("weather");
    const weatherIconElement = document.getElementById("weatherIcon");
    const backgroundElement = document.getElementById("background");

    success = (position) => {
        //console.log(position);
        
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const kelvin = 273.15;
        
        const apiKey = 'ee25328b304dd9d21c56964fedc87771';
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        
        fetch(apiUrl)
        .then((response) => {
            return response.json();

        })
        .then((data) => {
            //console.log(data);
            tempElement.innerText = `${(data.main.temp - kelvin).toFixed(1)}°C`;
            weatherElement.innerText = data.weather[0].description;
            
            let icon1 = data.weather[0].icon;
            weatherIconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${icon1}.png"/>`;

            

        });

    }

    error = () => {
        tempElement.innerText = "Unable to retrieve temperature";
        weatherElement.innerText = "Unable to retrieve weather";

    }

    navigator.geolocation.getCurrentPosition(success, error);

}


window.addEventListener("load", () => {
    setWeather();
    findLocation();
    setInterval(setDateTime, 1000);

});
