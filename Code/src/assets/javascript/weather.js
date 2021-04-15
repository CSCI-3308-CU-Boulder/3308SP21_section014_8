/* Function to create an object of the current weather conditions pulled from
    an API response. */
function getCondObj(response) {
    let condObj = {};

    condObj['Description'] = response.current.weather[0].description;
    condObj['Temperature'] = (response.current.temp);
    condObj['Feels Like'] = (response.current.feels_like);
    condObj['Temp-unit'] = 'F';
    condObj['Wind Speed'] = (response.current.wind_speed + ' mph');
    condObj['Day 1 Max'] = (response.daily[1].temp.max);
    condObj['Day 1 Min'] = (response.daily[1].temp.min);
    condObj['Day 2 Max'] = (response.daily[2].temp.max);
    condObj['Day 2 Min'] = (response.daily[2].temp.min);
    condObj['Day 3 Max'] = (response.daily[3].temp.max);
    condObj['Day 3 Min'] = (response.daily[3].temp.min);
    condObj['Day 4 Max'] = (response.daily[4].temp.max);
    condObj['Day 4 Min'] = (response.daily[4].temp.min);
    condObj['Day 5 Max'] = (response.daily[5].temp.max);
    condObj['Day 5 Min'] = (response.daily[5].temp.min);
    condObj['Day 6 Max'] = (response.daily[6].temp.max);
    condObj['Day 6 Min'] = (response.daily[6].temp.min);
    condObj['Day 7 Max'] = (response.daily[7].temp.max);
    condObj['Day 7 Min'] = (response.daily[7].temp.min);

    return condObj;
}


/* Update the cards displaying the current weather conditions passed in.*/
function updateCards(condObj) {
    $('#description').text(capitalizeFirst(condObj['Description']));
    $('#wind-speed').text(condObj['Wind Speed']);
    $('#degrees').text(Math.floor(condObj['Temperature']));
    $('#degree-unit').text(condObj['Temp-unit']);
    $('#feels-like').text(Math.floor(condObj['Temperature']));
    $('#feels-like-degree-unit').text(condObj['Temp-unit']);
    $('#1-max-degrees').text(Math.floor(condObj['Day 1 Max']));
    $('#1-max-degree-unit').text(condObj['Temp-unit']);
    $('#1-min-degrees').text(Math.floor(condObj['Day 1 Min']));
    $('#1-min-degree-unit').text(condObj['Temp-unit']);
    $('#2-max-degrees').text(Math.floor(condObj['Day 2 Max']));
    $('#2-max-degree-unit').text(condObj['Temp-unit']);
    $('#2-min-degrees').text(Math.floor(condObj['Day 2 Min']));
    $('#2-min-degree-unit').text(condObj['Temp-unit']);
    $('#3-max-degrees').text(Math.floor(condObj['Day 3 Max']));
    $('#3-max-degree-unit').text(condObj['Temp-unit']);
    $('#3-min-degrees').text(Math.floor(condObj['Day 3 Min']));
    $('#3-min-degree-unit').text(condObj['Temp-unit']);
    $('#4-max-degrees').text(Math.floor(condObj['Day 4 Max']));
    $('#4-max-degree-unit').text(condObj['Temp-unit']);
    $('#4-min-degrees').text(Math.floor(condObj['Day 4 Min']));
    $('#4-min-degree-unit').text(condObj['Temp-unit']);
    $('#5-max-degrees').text(Math.floor(condObj['Day 5 Max']));
    $('#5-max-degree-unit').text(condObj['Temp-unit']);
    $('#5-min-degrees').text(Math.floor(condObj['Day 5 Min']));
    $('#5-min-degree-unit').text(condObj['Temp-unit']);
    $('#6-max-degrees').text(Math.floor(condObj['Day 6 Max']));
    $('#6-max-degree-unit').text(condObj['Temp-unit']);
    $('#6-min-degrees').text(Math.floor(condObj['Day 6 Min']));
    $('#6-min-degree-unit').text(condObj['Temp-unit']);
    $('#7-max-degrees').text(Math.floor(condObj['Day 7 Max']));
    $('#7-max-degree-unit').text(condObj['Temp-unit']);
    $('#7-min-degrees').text(Math.floor(condObj['Day 7 Min']));
    $('#7-min-degree-unit').text(condObj['Temp-unit']);
}


/* Main API function.  Pass in lat long and name to call weather API, get the
    weather code and conditions, create a card, show the location on the map,
    then call the light change API */
function getWeather(resortLat, resortLon) {
    let units, apiKey = WEATHER_KEY;

    units = 'imperial';


    let weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${resortLat}&lon=${resortLon}&APPID=${apiKey}&units=${units}`;


    $.ajax({
            url: weatherUrl,
            method: 'GET'
        }).then((response) => {
            console.log('Api has been called.');

            $('#map').attr('src', `https://www.google.com/maps/embed/v1/view?key=${MAPS_KEY}&center=${resortLat},${resortLon}&zoom=14&maptype=satellite`);

            //weatherCode = response.weather[0].id;
            //console.log(weatherCode);
            console.log(response);

            // Create and display the card showing weather conditions.
            updateCards(getCondObj(response));

        })
}