$(document).ready(function() {
  getLocation()

  $(".exit-nav").on("click", function() {
    $('#side-main-menu').css("left", "-1000px")
    document.body.style.backgroundColor = "white";
  })

  $('.menu-link').on("click", function() {
    $('#side-main-menu').css("left", "0px")
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  })
})

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition)
  } else {
    alert("Geolocation is not supported by this browser")
  }
}

function setPosition(position) {
  let userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  let mapOptions = {
    zoom: 20,
    center: userLatLng
  }

  let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)

  let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

  let marker = new google.maps.Marker({
    position: userLatLng,
    title: "Current Location",
    animation: google.maps.Animation.DROP,
    icon: image,
  })

  marker.setMap(map)
}

//google maps initialization
function initMap() {
  let map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 20
  })
}
