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
            //updateCards(getCondObj(response));

        })
    }

})