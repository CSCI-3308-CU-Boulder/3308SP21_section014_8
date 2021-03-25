/* When the page is ready, load resorts into dropdown, add a map centered on
    Colorado, and set a click function for the resorts to call the
    getWeather function. */
$(document).ready(() => {

    console.log('Backcountry Page');

    //when submit button is clicked
    $("#locSubmit").click(function () {
        console.log('clicked')
        var lon = document.getElementById("longitude").value;
        var lat = document.getElementById("latitude").value;
        document.getElementById("lonText").innerHTML = lon;
        document.getElementById("latText").innerHTML = lat;

    })

})