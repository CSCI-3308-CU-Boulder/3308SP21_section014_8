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
function updateCards(iconId, condObj, bgColor, timezone) {
    $('#description').text(capitalizeFirst(condObj['Description']));
    $('#wind-speed').text(condObj['Wind Speed']);
    $('#degrees').text(Math.floor(condObj['Temperature']));
    $('#degree-unit').text(condObj['Temp-unit']);
}


/* Main API function.  Pass in lat long and name to call weather API, get the
    weather code and conditions, create a card, show the location on the map,
    then call the light change API */
function getWeather(resortLat, resortLon, resortName, resortObj) {
    let weatherCode, units,
        apiKey = WEATHER_KEY;

    units = 'imperial';


    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${resortLat}&lon=${resortLon}&APPID=${apiKey}&units=${units}`;

    if (resortObj[resortName].test) {

        weatherCode = resortObj[resortName].code;
        weatherCode = weatherCode.toString();
        updateCards(resortObj[resortName].icon, testCondObj, '#FFFFFF', 'America/Los_Angeles');
        $('#map').attr('src', `https://www.google.com/maps/embed/v1/view?key=${MAPS_KEY}&center=${resortLat},${resortLon}&zoom=14&maptype=satellite`);

    } else {
        $.ajax({
            url: weatherUrl,
            method: 'GET'
        }).then((response) => {
            console.log('Api has been called.');
            console.log(response.weather[0].id);

            $('#map').attr('src', `https://www.google.com/maps/embed/v1/view?key=${MAPS_KEY}&center=${resortLat},${resortLon}&zoom=14&maptype=satellite`);

            weatherCode = response.weather[0].id;
            console.log(weatherCode);

            let iconId = response.weather[0].icon,
                bgColor = codes[weatherCode].params.color,
                timezone = resortObj[resortName].tz;

            // Create and display the card showing weather conditions.
            updateCards(iconId, getCondObj(response), bgColor, timezone);

        })
    }
}