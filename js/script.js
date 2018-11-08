var map;
var yoobee = {
    lat: -41.279178,
    lng: 174.780331
}
var newMarker;

function initMap() {

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById('map'), {
        center: yoobee,
        zoom: 15
    });

    var marker = new google.maps.Marker({position: yoobee, map: map});

    map.addListener('click', function(event) {
        if(newMarker && newMarker.setMap){
            newMarker.setMap(null);
        }

        newMarker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
        showDirections(event.latLng);
    });

    function showDirections(destinationLocation){

        directionsDisplay.setMap(map);

        var request = {
            origin: yoobee,
            destination: destinationLocation,
            travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
                console.log(result.routes[0].legs[0].distance.text);
                console.log(result.routes[0].legs[0].duration.text);
            } else if(status == 'NOT_FOUND'){

            } else if(status == 'ZERO_RESULTS'){

            }
        });
    }
}
