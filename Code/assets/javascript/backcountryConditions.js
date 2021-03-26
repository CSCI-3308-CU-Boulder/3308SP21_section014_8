/* When the page is ready, load resorts into dropdown, add a map centered on
    Colorado, and set a click function for the resorts to call the
    getWeather function. */
$(document).ready(() => {

    //loading map to world-view initially
    $('#map').attr('src', `https://www.google.com/maps/embed/v1/view?key=${MAPS_KEY}
    &center=39.5501,-105.7821&zoom=1&maptype=satellite`);

    console.log('Backcountry Page');

    //when submit button is clicked
    $("#locSubmit").click(function () {
        console.log('clicked')
        var lon = document.getElementById("longitude").value;
        var lat = document.getElementById("latitude").value;
        document.getElementById("lonText").innerHTML = lon;
        document.getElementById("latText").innerHTML = lat;
        getBackcountryWeather(lat,lon)
    })

    function getBackcountryWeather(resortLat, resortLon) {


        let units = 'imperial';


        let weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${resortLat}&lon=${resortLon}&APPID=${WEATHER_KEY}&units=${units}`;


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
            updateBackcountryCards(getBackcountryCondObj(response));

        })
    }

    function getBackcountryCondObj(response) {
        let condObj = {};

        condObj['Description'] = response.current.weather[0].description;
        condObj['Temperature'] = (response.current.temp);
        condObj['Feels Like'] = (response.current.feels_like);
        condObj['Temp-unit'] = 'F';
        condObj['Pressure'] = (response.current.pressure + ' hPa');
        condObj['Humidity'] = (response.current.humidity + '%');
        condObj['Dew Point'] = (response.current.dew_point);
        condObj['UV Index'] = (response.current.uvi);
        condObj['Visibility'] = (response.current.visibility + ' meters');
        condObj['Wind Speed'] = (response.current.wind_speed + ' mph');
        condObj['Wind Gusts'] = (response.current.wind_gust + ' mph');
        condObj['Wind Direction'] = (response.current.wind_deg);

        return condObj;
    }

    function updateBackcountryCards(condObj) {
        $('#description').text(capitalizeFirst(condObj['Description']));
        $('#degrees').text(Math.floor(condObj['Temperature']));
        $('#degree-unit').text(condObj['Temp-unit']);
        $('#feels-like').text(Math.floor(condObj['Temperature']));
        $('#feels-like-degree-unit').text(condObj['Temp-unit']);
        $('#pressure').text(condObj['Pressure']);
        $('#humidity').text(condObj['Humidity']);
        $('#dew-point').text(condObj['Dew Point']);
        $('#uv-index').text(condObj['UV Index']);
        $('#visibility').text(condObj['Visibility']);
        $('#wind-speed').text(condObj['Wind Speed']);
        $('#wind-gusts').text(condObj['Wind Gusts']);
        $('#wind-direction').text(condObj['Wind Direction']);
    }

    function capitalizeFirst(str) {
        let newArr = str.split(' ');
        newArr.forEach((word, index) => {
            newArr[index] = word[0].toUpperCase() + word.substring(1);
        })
        return newArr.join(' ');
    }

})