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
      // HTML Marker & Popup
      // Show Class Depending On Value of Percent Free
      if(percentFree > 10){
        map.drawOverlay({
          lat: value.lat,
          lng: value.lng,
          content: '<div class="dott"><div class="mark blue"></div><div class="dot-mk blue pulse"></div></div>'
        });
      }else{
        map.drawOverlay({
          lat: value.lat,
          lng: value.lng,
          content: '<div class="dott"><div class="mark red"></div><div class="dot-mk red pulse-sm"></div></div>'
        });
      }
      // Add Event Listener

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
  $('.btn-primary').click(function(){
    if($(this).text() == 'How It Works?'){
      $(this).parent().addClass('animated fadeOutLeft');
      $('.dot').eq(1).addClass('active').siblings().removeClass('active');
    }else if($(this).text() == 'View Parking') {
      $(this).parent().addClass('animated fadeOutLeft')
      $('.dot').eq(2).addClass('active').siblings().removeClass('active');
    }else{
      $('.sb').addClass('animated fadeOutLeft');
    }
  });
  $('.btn-sub').click(function(){
    $('.sb').addClass('animated fadeOutLeft');
  });
}

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
