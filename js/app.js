$(function(){

  // API Configuration
  var api = {
    parking_base_url: 'https://api.phila.gov/airport-parking/v1/'
  };

  // Philadelphia Airpot GEO locations
  var airportCoords = {
    lat: 39.878500,
    lng: -75.246000
  };

  // Create a map
  var map = new GMaps({
    div: '#map',
    lat: airportCoords.lat,
    lng: airportCoords.lng,
    zoom: 17,
    styles: styles
  });

  getUsersLocation();
  // getParkingData(api);
  //getParkingData(api);

  // Get Parking Data
  $.getJSON(api.parking_base_url, function(data){
    // Loop Through Data and add each point
    $.each(data.garages, function(key, value){
      console.log(value);
      // Get Percent of Spots available
      var freeSpaces = parseInt(value.spaces_available);
      var totalSpaces = parseInt(value.total_spaces);
      var percentFree = Math.round((freeSpaces/totalSpaces) * 100);
      console.log(percentFree);
      if(percentFree <= 20){
      // Add A Map Marker With Data For Each Point
      map.addMarker({
        lat: value.lat,
        lng: value.lng,
        icon: '../imgs/low-parking.svg',
        title: 'Parking Lot',
        click: function(e) {
          console.log('You clicked in this marker');
        },
        infoWindow: {
          content: '<h1>' + value.display_name + '</h1><p class="spaces">' + Math.round(value.spaces_available) + '</p><p class="handicap">' + value.ada_spaces + '</p><p class=percent-free' + percentFree+'% </p>',
          maxHeight: 400
        }
      });
    }else{
      map.addMarker({
        lat: value.lat,
        lng: value.lng,
        icon: '../imgs/full-parking.svg',
        title: 'Parking Lot',
        click: function(e) {
          console.log('You clicked in this marker');
        },
        infoWindow: {
          content: '<h1>' + value.display_name + '</h1><p class="spaces">' + Math.round(value.spaces_available) + '</p><p class="handicap">' + value.ada_spaces + '</p><p class=percent-free' + percentFree+'% </p>',
          maxHeight: 400
        }
      });
    }
    });
  });

  // Sidebar Content Switch
  sbContentToggle();
}); // End Of Main







// ------------------------
//    getUsersLocation()
// ------------------------
function getUsersLocation() {
    // User's Location
    var userLoc = {
      lat: 0,
      lng: 0
    };

    // Success Function
    function success(pos){
      var crd = pos.coords;
      console.log('Your current position is:');
      console.log(crd.latitude);
      console.log(crd.longitude);
      userLoc = {
        lat: crd.latitude,
        lng: crd.longitude
      }
      // Returns User's Location
      return userLoc;
    }

    // Error Function
    function error(){
      // Returns Philly's Long & Lat
      userLoc = {
        lat: 39.953,
        lng: 75.165
      };
      console.log('Default location is Philly...');
      return(userLocation);
    }
    // Get location API Call
    navigator.geolocation.getCurrentPosition(success, error);
}

// ------------------------
//     getParkingData()
// ------------------------
function getParkingData(api){
  var data = [];
  // GET data from Parking API
  $.getJSON(api.parking_base_url, function(data){
    // Return Data
    $.each(data.garages, function(key, value){
      console.log(value);
      var garage = data.garages;
      map.addMarker({
        lat: value.lat,
        lng: value.lng,
        title: 'Parking Lot',
        click: function(e) {
          alert('You clicked in this marker');
        }
      });
    });
  });
  // return data
  // console.log(data);
  // return data
}

// ------------------------
//     sbContentToggle()
// ------------------------
function sbContentToggle(){
  $('#main-btn').click(function(){


  });
}

// ------------------------
//       Sidebar Data
// ------------------------
var sb_content = [
  {
    id: 1,
    title: 'Airport Parking App',
    content: 'An app to show you the most available lots to park before you go on that dream vacation, or dreaded business trip.',
    btn_text: 'How It Works'
  },
  {
    id: 2,
    title: 'How It Works?',
    content: '../imgs/process.png',
    btn_text: 'The Results'
  },
  {
    id: 3,
    title: 'Ready To Go?',
    content: '../imgs/process.png',
    btn_text: 'View Parking'
  }
]

var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];
