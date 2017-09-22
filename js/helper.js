/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/


/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/


var HTMLheaderName = '<div id="name"><h1 >%data%</h1></div>';
var HTMLheaderRole = '<div id="titleHeader">%data%</div><br>';

var HTMLcontactGeneric = '<div class="flex-item"><span class="contact-text">%contact%</span><span class="contact-text">%data%</span></div>';

var HTMLmobile = '<a href="#"><li class="flex-item"><span class="contact-text">phone</span><span class="contact-text">%data%</span></li></a>';
var HTMLemail = '<a href="mailto:nataliecyreus@gmail.com"><li class="contact-text zocial-email">%data%</li></a>';
var HTMLtwitter = '<a target="blank" href="https://twitter.com/CyreusNatalie"><li class="flex-item"><span class="contact-text"><span class="contact-text">%data%</span></li></a>';


var HTMLlinkedIn = '<a href="https://www.linkedin.com/in/natalie-cyreus"><li class="contact-text zocial-linkedin">%data%</li></a>';

var HTMLgithub = '<a href="https://github.com/NatalieCyreus"><li class="contact-text zocial-github">%data%</li></a>';


var HTMLblog = '<a href="https://thecookingswede.com"><li class="flex-item"><span class="contact-text">Blog</span><span class="contact-text">%data%</span></li></a>';
var HTMLlocation = '<a href="#"><li class="contact-text">%data%</li></a>';
var HTMLskype = '<a href="#"><li class="flex-item"><span class="contact-text">Skype</span></span><span class="contact-text">%data%</span></li><a>';

var HTMLbioPic = '<img src="%data%" class="bioPic ">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<div class="skills-entry"></div>';
var HTMLskills ='<div class="role-text">%data%</div>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="https://spinviewglobal.com/">%data%</a>';
var HTMLworkTitle = '<h4> %data%</h4>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';
var HTMLworkPic = '<img src="%data%" class="img-responsive">';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a target="_blank" href="%#%">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img class="img-responsive" src="%data%"><hr>';


var HTMLVolunteeringStart = '<div class="volunteering-entry"></div>';
var HTMLVolunteeringTitle = '<h4>%data%</h4>';
var HTMLVolunteeringDates = '<div class="date-text">%data%</div>';
var HTMLVolunteeringDescription = '<p><br>%data%</p><br><hr>';


var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="%#%">%data%</a>';
var HTMLschoolDegree = '<h4>%data%</h4>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div><br><hr>';
var HTMLschoolMajor = '<em class="school"><br>Major: %data%</em>';
var HTMLschoolPic = '<img src="%data%" class="img-responsive animation-element slide-left">';

var HTMLonlineClasses = '<h3 class="h3onlineSchool">Online Classes</h3>';
var HTMLonlineTitle = '<a href="#" id="titleHeader">%data%</a>';
var HTMLonlineSchool = ' <a href="#">%data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div><br><hr>';
var HTMLonlineURL = '<br><a href="#" class="online-link">%data%</a>';
var HTMLonlinePic = '<img src="%data%" class="img-responsive animation-element slide-left">';

var internationalizeButton = '<button class="interButton">Internationalize</button>';
var googleMap = '<div id="map"></div>';


/*
The Internationalize Names challenge found in the lesson Flow Control from JavaScript Basics requires you to create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var $name = $('#name');
    var iName = inName($name.text()) || function(){};
    $name.html(iName);
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in the lesson Flow Control from JavaScript Basics.
*/
var clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  logClicks(event.pageX, event.pageY);

});


/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  /*
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js.
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    education.schools.forEach(function(school){
      locations.push(school.location);
    });

    // iterates through work locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    work.jobs.forEach(function(job){
      locations.push(job.location);
    });

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

//Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});
