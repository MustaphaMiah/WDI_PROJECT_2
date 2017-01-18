const App    = App    || {};
const google = google;

App.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main  = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.home').on('click', this.homepage.bind(this));
  this.$main.on('submit', 'form', this.handleForm);
  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

App.createMap = function() {
  const canvas = document.getElementById('canvas');
  const mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(51.497860, -0.137855),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles:
    [
      {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#ffffff'
          }
        ]
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#000000'
          },
          {
            'lightness': 13
          }
        ]
      },
      {
        'featureType': 'administrative',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#000000'
          }
        ]
      },
      {
        'featureType': 'administrative',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#144b53'
          },
          {
            'lightness': 14
          },
          {
            'weight': 1.4
          }
        ]
      },
      {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#10171f'
          },
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'landscape.man_made',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'landscape.natural',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'landscape.natural.landcover',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'on'
          },
          {
            'lightness': '0'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [
          {
            'hue': '#ff00de'
          },
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'lightness': 5
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels',
        'stylers': [
          {
            'weight': '0.01'
          },
          {
            'lightness': '0'
          },
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'visibility': 'on'
          },
          {
            'color': '#ff0000'
          }
        ]
      },
      {
        'featureType': 'poi.attraction',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'poi.business',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi.government',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi.medical',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi.place_of_worship',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi.school',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi.sports_complex',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#000000'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#0b434f'
          },
          {
            'lightness': 25
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#51bfca'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#a84c9c'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#0b3d51'
          },
          {
            'lightness': 16
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#51bfca'
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#146474'
          },
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#021019'
          }
        ]
      }
    ]
  };

  App.map = new google.maps.Map(canvas, mapOptions);
  this.getCrimes();
};

App.getCrimes = function() {
  navigator.geolocation.getCurrentPosition(position => {
    // Get crimes
    $.get(`https://data.police.uk/api/crimes-street/all-crime?lat=${position.coords.latitude}&lng=${position.coords.longitude}`).done( data => {
      const crimes = data.filter(crime => crime.category === 'vehicle-crime');
      this.loopThroughArray(crimes);
      // console.log(crimes);
    });

    const latlng = new google.maps.LatLng(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));

    // Add you to the map!
    var newMarker = new google.maps.Marker({
      position: latlng,
      map: App.map,
      icon: '../images/you.png',
      animation: google.maps.Animation.DROP
    });

    var cityCircle = new google.maps.Circle({
      strokeColor: '#42f453',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#42f453',
      fillOpacity: 0.35,
      map: App.map,
      radius: 1700,
      center: latlng
    });

    App.map.panTo(latlng);
    App.map.setZoom(14);

    const service = new google.maps.places.PlacesService(App.map);

    const request = {
      location: latlng,
      radius: '1600',
      types: ['parking']
    };

    setTimeout(function(){
      service.nearbySearch(request, callback);
    }, 2000);

    function callback(results, status){
      // console.log(status);
      if (status === 'OK'){
        $.each(results, (index, parking) => {
          App.addMarkerForParking(parking);
        });
      }
    }
  });
};

App.loopThroughArray = function(data) {
  $.each(data, (index, crime) => {
    setTimeout(() => {
      App.addMarkerForCrime(crime);
    }, index*80);
  });
};

App.addMarkerForParking = function(parking){
  // console.log(parking);
  const marker = new google.maps.Marker({
    position: parking.geometry.location,
    map: App.map,
    icon: '../images/p.png',
    animation: google.maps.Animation.DROP
  });

  App.addInfoWindowForParking(parking, marker);
};

App.addInfoWindowForParking = function(parking, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    const rating = parking.rating ? parking.rating : 'Unknown';

    this.infoWindow = new google.maps.InfoWindow({
      content: `
      <div class="info-window2">
      <h2>Parking</h2>
      <p>Name: ${parking.name}</p><p>Rating: ${rating}</p>
      </div>
      `
    });

    this.infoWindow.open(this.map, marker);
  });
};

App.addMarkerForCrime = function(crime) {
  const latlng = new google.maps.LatLng(parseFloat(crime.location.latitude), parseFloat(crime.location.longitude));
  const marker = new google.maps.Marker({
    position: latlng,
    map: App.map,
    icon: '../images/marker.png',
    animation: google.maps.Animation.DROP
  });

  App.addInfoWindowForCrime(crime, marker);
};

App.addInfoWindowForCrime = function(crime, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: `
      <div class="info-window">
      <h2>Crime</h2>
      <p>Outcome: ${crime.outcome_status.category}</p><p>Where: ${ crime.location.street.name }</p><p>When: ${ crime.month }</p>
      </div>`});

    this.infoWindow.open(this.map, marker);
  });
};

// $(Crime.mapSetup.bind(Crime));

App.loggedInState = function() {
  // console.log('loggedin');
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.$main.html(`
    <div id="canvas"></div>
    `);

  $('body').css('background', 'none');

  this.createMap.bind(this)();
};


App.loggedOutState = function(){
  $('.loggedIn').hide();
  $('.loggedOut').show();
  $('body').css('background-image', 'url(http://cdn3.digitalartsonline.co.uk/cmsdata/slideshow/3517021/3_Fortune_FutureDashboard-DA.jpg)');

  this.register();
};



App.register = function(e){
  if (e) e.preventDefault();
  this.$main.html(`
    <h2 class = "signup">Sign Up</h2>
    <form method="post" action="/register">
    <div class="form-group">
    <input class="form-control" type="text" name="user[username]" placeholder="Username">
    </div>
    <div class="form-group">
    <input class="form-control" type="email" name="user[email]" placeholder="Email">
    </div>
    <div class="form-group">
    <input class="form-control" type="password" name="user[password]" placeholder="Password">
    </div>
    <div class="form-group">
    <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
    </div>
    <input class="btn btn-primary" type="submit" value="Register">
    </form>
    `);
};

App.login = function(e) {
  e.preventDefault();
  this.$main.html(`
    <h2 class = "login" >Login</h2>
    <form method="post" action="/login">
    <div class="form-group">
    <input class="form-control" type="email" name="email" placeholder="Email">
    </div>
    <div class="form-group">
    <input class="form-control" type="password" name="password" placeholder="Password">
    </div>
    <input class="btn btn-primary" type="submit" value="Login">
    </form>
    `);
};

App.logout = function(e){
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

App.homepage = function(){
};

App.handleForm = function(e){
  e.preventDefault();
  const url    = `${App.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();
  return App.ajaxRequest(url, method, data, data => {
    if (data.token) App.setToken(data.token);
    App.loggedInState();
  });
};

App.ajaxRequest = function(url, method, data, callback){
  return $.ajax({
    url,
    method,
    data,
    beforeSend: this.setRequestHeader.bind(this)
  })
  .done(callback)
  .fail(data => {
    console.log(data);
  });
};

App.setRequestHeader = function(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
};
App.setToken = function(token){
  return window.localStorage.setItem('token', token);
};
App.getToken = function(){
  return window.localStorage.getItem('token');
};
App.removeToken = function(){
  return window.localStorage.clear();
};
$(App.init.bind(App));
