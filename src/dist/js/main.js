/****************************************************
  When DOM is ready
*****************************************************/

$(document).ready(function() {
  //click event for "X" button in event post
  $('.exit').on("click", () => {
    removePost()
  })

  //when notification button is clicked
  $('.fa-bell').on("click", () => {
    let display = $('.popup-notification').css("display")

    if (display === "none") {
      $('.popup-notification').css("display", "flex")
      $('.popup-event').css("display", "none")
    } else {
      $('.popup-notification').css("display", "none")
    }
  })

  //when event button is clicked
  $('.fa-calendar').on("click", () => {
    let display = $('.popup-event').css("display")

    if (display === "none") {
      $('.popup-event').css("display", "flex")
      $('.popup-event').css("left", "-175px")

      $('.popup-notification').css("display", "none")
    } else {
      $('.popup-event').css("display", "none")
    }
  })
})


/****************************************************
  Initialize Google Map API ----- Google Maps Controls
*****************************************************/

function initMap() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 16
  })
  initAutocomplete(map)
}

/****************************************************
  Initialize GPS
*****************************************************/

function getLocation() {
  if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(setPosition) }
  else { alert("Geolocation is not supported by this browser") }
}


/****************************************************
  Set the position of Map to current user location
*****************************************************/

function setPosition(position) {
  let lat = position.coords.latitude
  let lng = position.coords.longitude

  let userLatLng = new google.maps.LatLng(lat, lng)

  let mapOptions = {
  zoom: 18,
  center: userLatLng
  }

  let userCurrentLocation = new google.maps.Marker({
    position: userLatLng,
    title: "Current Location",
    animation: google.maps.Animation.DROP,
    icon: "images/placeholder.png",
    map: map
  })

  map.setCenter(userLatLng)
  placeMarkers(lat, lng)
}

/****************************************************
  Initialize AutoComplete SearchBox
*****************************************************/

function initAutocomplete(map) {
  let { input, btn } = createMapControls()

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(btn);

  let autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  let marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', () => {
    marker.setVisible(false);
    let place = autocomplete.getPlace();
    if (!place.geometry) {
      console.log("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(18);
    }
    marker.setIcon(({
      url: "images/placeholder.png",
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    placeMarkers(place.geometry.location.lat(), place.geometry.location.lng())
  });
}

/****************************************************
  Create Input and GPS-Button for Map Controls
*****************************************************/

function createMapControls() {
  let input = document.createElement("input")
  let btn = document.createElement("button")

  input.setAttribute("id", "search-location")
  input.setAttribute("class", "map-control")

  btn.setAttribute("id", "gps-btn")
  btn.setAttribute("class", "btn btn-outline-primary")
  btn.innerHTML = "Use GPS"

  btn.addEventListener("click", getLocation)

  return {
    input,
    btn
  }
}

/****************************************************
  Place Markers onto the map
*****************************************************/

function placeMarkers(lat, lng) {
  let customMarker1 = new google.maps.LatLng(lat - 0.00015, lng + 0.0015)
  let customMarker2 = new google.maps.LatLng(lat + 0.00010, lng - 0.0010)
  let customMarker3 = new google.maps.LatLng(lat + 0.00028, lng + 0.0019)
  let customMarker4 = new google.maps.LatLng(lat - 0.00019, lng - 0.0010)

  let marker1 = new google.maps.Marker({
    position: customMarker1,
    title: "Cheap Here",
    animation: google.maps.Animation.DROP,
    icon: "images/cheap.png",
    map: map,
    venueInfo: {
      venueName: "Bacchus Bar Restaurant And Pool",
      venueImage: "images/places/bacchus.JPG",
      venueDescription: "This place is so cheap!! Buy one and get one free SPIRIT!",
      venueLocation: "Podium Level, Rydges South Bank, Grey & Glenelg Sts., South Brisbane QLD 4101"
    }
  })

  let marker2 = new google.maps.Marker({
    position: customMarker2,
    title: "Quiet Place",
    animation: google.maps.Animation.DROP,
    icon: "images/not-busy.png",
    map: map,
    venueInfo: {
      venueName: "Cloudland",
      venueImage: "images/places/cloudland.jpg",
      venueDescription: "Only few people here! Very quiet and relaxed",
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
      venueImage: "images/places/fringebar.jpg",
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
      venueImage: "images/places/jadeBuddha.jpg",
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

/****************************************************
 Post Popup Trigger Functions
*****************************************************/

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
