// TTC App JS File
// API Key: AIzaSyCQILEPhJaXY7iLnSr2B_vtomrIRSg6kI4

var app = {};
var $geolocation = [];
var closestStopsName = [];
var closestStopsURI = [];



app.getGeo = function(){
	$.geolocation.get({win: app.updatePosition, fail: app.geoError});
};

app.updatePosition = function(position) {
	$geolocation[0] = position.coords.latitude;
	$geolocation[1] = position.coords.longitude;
	app.getStops($geolocation[0], $geolocation[1]);
};

app.geoError = function(){
	 alert("No location info available. Error code: " + error.code);
};

app.getStops = function(lat, lon){
	$.ajax({
		url:'http://myttc.ca/near/' + lat + ',' + lon + '.json',
		type: 'GET',
		dataType: 'jsonp',
		success: function(response){
			console.log(response);
			for (var i =0; i<3; i++){
				closestStopsName[i] = response.locations[i].name;
				closestStopsURI[i] = response.locations[i].uri;
			}
		}
	})
};

app.getPlaces = function(lat, lon){
	$.ajax({
		url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			key: 'AIzaSyArRVZ-NVkbo5_Ux1AKg7ChSny27D7EtYo',
			location:lat+","+lon,
			rankby: 'distance',
			type: 'cafe',
			opennow: ''
		},
		success: function(response) {
			console.log(response);
		}
	});
};




app.init = function (){
	app.getGeo();
	
};

$(function(){
	app.init();
});


var map;
var marker;
function initialize() {
  map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 18,
    center: {lat: 43.648, lng: -79.398}
  });

  marker = new google.maps.Marker({
  	position: new google.maps.LatLng(43.648, -79.398),
  	title: "Hello World!"
  });
  marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
