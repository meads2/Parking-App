// ----------------------
//     Main Map Module
// ----------------------
var App = {
  init: function(){
    // Config Options
    App.config = {
      map_el: '#map',
      api: 'https://api.phila.gov/airport-parking/v1/',
      airport_lat: 39.877900,
      airport_lng: -75.246000,
      map_zoom: 17,
      custom_map_settings: this.customMap,
      free_el: App.parking_free_el,
      full_el: App.parking_full_el
      };
    // Bundles App
    App.setup();
  },
  setup: function(){
    //App.bindEvnets();
    App.createMap();
    App.getData();
    App.addOverlays();
  },
  createMap: function(){
    App.map = new GMaps({
      div: App.config.map_el,
      lat: App.config.airport_lat,
      lng: App.config.airport_lng,
      zoom: App.config.map_zoom,
      styles: App.config.custom_map_settings,
      click: function(e){
        console.log(e.latLng);
      }
    });
  },
  getData: function(){
    $.getJSON(App.config.api, function(data){
      App.addOverlays(data.garages)
      return data.garages
    });
  },
  addOverlays: function(data){
    $.each(data, function(key, value){
      console.log(value);
      // Get Percent of Spots available
      var freeSpaces = parseInt(value.spaces_available);
      var totalSpaces = parseInt(value.total_spaces);
      var percentFree = Math.round((freeSpaces/totalSpaces) * 100);
      console.log(percentFree);
      // HTML Marker & Popup
      // Show Class Depending On Value of Percent Free
      if(percentFree > 10){
        App.map.drawOverlay({
          lat: value.lat,
          lng: value.lng,
          content: '<div class="dott"><div class="mark blue"></div><div class="dot-mk blue pulse"></div></div>'
        });
      }else{
        App.map.drawOverlay({
          lat: value.lat,
          lng: value.lng,
          content: '<div class="dott"><div class="mark red"></div><div class="dot-mk red pulse-sm"></div></div>'
        });
      }
    });
  },
  addInfo: function(){

  },
  parking_free_el: '<div class="dott"><div class="mark blue"></div><div class="dot-mk blue pulse"></div></div>',
  parking_full_el: '<div class="dott"><div class="mark red"></div><div class="dot-mk red pulse-sm"></div></div>',
  customMap: [
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
  ]
}

App.init()





// ----------------------
//     Sidebar Module
// ----------------------
var Sidebar = {
    init: function(){
      // Call Functions
      this.domCache();
      this.eventBinder();
    },
    domCache: function(){
      // Sidebar
      this.$el = $('#sidebar');
      // Pagination dots
      this.$dots = this.$el.find('.dot');
      // card
      this.$card = this.$el.find('.card');
      // Main Button
      this.$main_btn = this.$el.find('.btn-primary');
      // Skip tutorial Button
      this.$btn_sub = this.$el.find('.btn-sub');
    },
    eventBinder: function(){
      // Main Button Clicked
      this.$main_btn.click(this.nextPanel.bind(this));
      // Sidebar Closed
      this.$btn_sub.click(this.closeSidebar.bind(this));
    },
    nextPanel: function(e){
      // Get current index
      var index = $('.dot.active').index();
      // card is last, close sidebar
      if(index == 2){
          this.$el.addClass('animated fadeOutLeft');
      }
      // Fade Out That Card
      this.$card.eq(index).addClass('animated fadeOutLeft');
      // Add Active class to next dot
      this.$dots.removeClass('active');
      this.$dots.eq(index + 1).addClass('active');
    },
    prevPanel: function(e){
      alert('prev panel');
      var index = $('.dot.active').index();
      this.$card.eq(index-1).addClass('animated fadeInRight');
    },
    closeSidebar: function(){
      this.$el.addClass('animated fadeOutLeft');
    },
    openSidebar: function(){
      alert('sidebar opened');
    }
};

Sidebar.init();


// function sbContentToggle(){
//   $('.btn-primary').click(function(){
//     if($(this).text() == 'How It Works?'){
//       $(this).parent().addClass('animated fadeOutLeft');
//       $('.dot').eq(1).addClass('active').siblings().removeClass('active');
//     }else if($(this).text() == 'View Parking') {
//       $(this).parent().addClass('animated fadeOutLeft')
//       $('.dot').eq(2).addClass('active').siblings().removeClass('active');
//     }else{
//       $('.sb').addClass('animated fadeOutLeft');
//     }
//   });
//   $('.btn-sub').click(function(){
//     $('.sb').addClass('animated fadeOutLeft');
//   });
// };
//
// sbContentToggle();
