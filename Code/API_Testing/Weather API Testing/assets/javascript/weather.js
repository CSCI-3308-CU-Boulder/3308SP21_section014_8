/* Function to create an object of the current weather conditions pulled from
    an API response. */
function getCondObj(response) {
    let condObj = {};

    condObj['Description'] = response.weather[0].description;
    condObj['Temperature'] = (response.main.temp);
    condObj['Temp-unit'] = 'F';
    condObj['Wind Speed'] = (response.wind.speed + ' mph');

    return condObj;
}


/* Update the cards displaying the current weather conditions passed in.*/
function updateCards(condObj) {
    $('#description').text(capitalizeFirst(condObj['Description']));
    $('#wind-speed').text(condObj['Wind Speed']);
    $('#degrees').text(Math.floor(condObj['Temperature']));
    $('#degree-unit').text(condObj['Temp-unit']);
}


/* Main API function.  Pass in lat long and name to call weather API, get the
    weather code and conditions, create a card, show the location on the map,
    then call the light change API */
function getWeather(resortLat, resortLon) {
    let weatherCode, units,
        apiKey = WEATHER_KEY;

    units = 'imperial';


    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${resortLat}&lon=${resortLon}&APPID=${apiKey}&units=${units}`;


        $.ajax({
            url: weatherUrl,
            method: 'GET'
        }).then((response) => {
            console.log('Api has been called.');
            console.log(response.weather[0].id);

            $('#map').attr('src', `https://www.google.com/maps/embed/v1/view?key=${MAPS_KEY}&center=${resortLat},${resortLon}&zoom=14&maptype=satellite`);

            weatherCode = response.weather[0].id;
            console.log(weatherCode);

            // Create and display the card showing weather conditions.
            updateCards(getCondObj(response));

        })
}