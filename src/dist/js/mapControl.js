$(document).ready(function() {
  //when GPS button is clicked
  //show current location and markers
  $('#gps-btn').on("click", () => {
    getLocation()
  })

  //click event for "X" button in event post
  $('.exit').on("click", () => {
    removePost()
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
    map: map,
    venueInfo: {
      venueName: "Bacchus Bar Restaurant And Pool",
      venueImage: "../../../images/places/bacchus.JPG",
      venueDescription: "This place is so cheap!! Buy one and get one free SPIRIT!",
      venueLocation: "Podium Level, Rydges South Bank, Grey & Glenelg Sts., South Brisbane QLD 4101"
    }
  })

  let marker2 = new google.maps.Marker({
    position: customMarker2,
    title: "Too Crowded",
    animation: google.maps.Animation.DROP,
    icon: "images/group.png",
    map: map,
    venueInfo: {
      venueName: "Cloudland",
      venueImage: "../../../images/places/cloudland.jpg",
      venueDescription: "So so so so crowded, can't even dance here :(",
      venueLocation: "641 Ann St, Fortitude Valley QLD 4006"
    }
  })

  let marker3 = new google.maps.Marker({
    position: customMarker3,
    title: "Expensive Here",
    animation: google.maps.Animation.DROP,
    icon: "images/expensive.png",
    map: map,
    venueInfo: {
      venueName: "The Fringe Bar",
      venueImage: "../../../images/places/fringebar.jpg",
      venueDescription: "This place totally rips you off!! Don't pay 15 bucks for a beer!",
      venueLocation: "Ann St & Constance Street, Fortitude Valley QLD 4006"
    }
  })

  let marker4 = new google.maps.Marker({
    position: customMarker4,
    title: "Too Crowded",
    animation: google.maps.Animation.DROP,
    icon: "images/group.png",
    map: map,
    venueInfo: {
      venueName: "Jade Buddha",
      venueImage: "../../../images/places/jadeBuddha.jpg",
      venueDescription: "Packed with people here, if you wanna experience a human hamburger I definitely recommend you to come here :)",
      venueLocation: "14/1 Eagle St, Brisbane City QLD 4000"
    }
  })

  //Click listeners for the markers
  marker1.addListener('click', showPost)
  marker2.addListener('click', showPost)
  marker3.addListener('click', showPost)
  marker4.addListener('click', showPost)
}

//when the marker is clicked, show the event info
function showPost() {
  let { venueName, venueImage, venueDescription, venueLocation } = this.venueInfo
  $('.event-name').text(venueName)
  $('.event-photo').attr('src', venueImage)
  $('.event-description').text(venueDescription)

  $('#event-info').css("top", "70px")
}

function removePost() {
  $('#event-info').css("top", "2000px")
}

//google maps initialization
function initMap() {
  let map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 20
  })
}
