/* When the page is ready, load resorts into dropdown, add a map centered on
    Colorado, and set a click function for the resorts to call the
    getWeather function. */

$(document).ready(() => {
    let resortObj;
    /* Add resorts to the dropdown located in the navbar, they will be added
        to the nav-resorts id and each item will be given the class nav-item */

    resortObj = skiResorts;
    addResorts(resortObj, 'nav-item', 'nav-resorts');

    console.log(resortObj);

    //loading map to colorado initially
    $('#map').attr('src', `https://www.google.com/maps/embed/v1/view?key=${MAPS_KEY}
    &center=39.5501,-105.7821&zoom=8&maptype=satellite`);

    //on click of dropdown menu
    $(document.body).on('click', 'a', function () {

        console.log('hello');

        let resortName = $(this).parent().attr('data-name'),
            lat = resortObj[resortName].lat,
            lon = resortObj[resortName].long;

        console.log(resortObj[resortName].lat);


        /* Call the getWeather function with the clicked item's lat, long. */
        getWeather(lat, lon);
    });
});

function addResortsSetter() {
    let resortObj;
    resortObj = skiResorts;
    addResorts(resortObj, 'nav-item', 'nav-resorts');
    console.log("Resorts being set");
}