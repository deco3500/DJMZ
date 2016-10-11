$(document).ready(function() {
  $('#gps-btn').on("click", () => {
    getLocation()
  })
})

/**
  * Initialize the device's GPS if present, then call setPosition
  */
function getLocation() {
  if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(setPosition) }
  else { alert("Geolocation is not supported by this browser") }
}

/**
  * Construct the map markers
  */
function setPosition(position) {
  let lat = position.coords.latitude
  let lng = position.coords.longitude

  let userLatLng = new google.maps.LatLng(lat, lng)
  let customMarker1 = new google.maps.LatLng(lat - 0.00015, lng + 0.0015)
  let customMarker2 = new google.maps.LatLng(lat + 0.00010, lng - 0.0010)
  let customMarker3 = new google.maps.LatLng(lat + 0.00028, lng + 0.0019)
  let customMarker4 = new google.maps.LatLng(lat - 0.00019, lng - 0.0010)

  let mapOptions = {
  zoom: 18,
  center: userLatLng
  }

  let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)

  let userCurrentLocation = new google.maps.Marker({
    position: userLatLng,
    title: "Current Location",
    animation: google.maps.Animation.DROP,
    icon: "images/placeholder.png",
    map: map
  })

  let marker1 = new google.maps.Marker({
    position: customMarker1,
    title: "Cheap Here",
    animation: google.maps.Animation.DROP,
    icon: "images/cheap.png",
    map: map
  })

  let marker2 = new google.maps.Marker({
    position: customMarker2,
    title: "Too Crowded",
    animation: google.maps.Animation.DROP,
    icon: "images/group.png",
    map: map
  })

  let marker3 = new google.maps.Marker({
    position: customMarker3,
    title: "Expensive Here",
    animation: google.maps.Animation.DROP,
    icon: "images/expensive.png",
    map: map
  })

  let marker4 = new google.maps.Marker({
    position: customMarker4,
    title: "Too Crowded",
    animation: google.maps.Animation.DROP,
    icon: "images/group.png",
    map: map
  })
}

//google maps initialization
function initMap() {
  let map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 20
  })
}
