const App = App || {};
const google = google || {};

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
    zoom: 14,
    center: new google.maps.LatLng(51.506178, -0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  App.map = new google.maps.Map(canvas, mapOptions);
  // this.getGyms();

};

App.loggedInState = function(){
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.$main.html(`
    <div id="canvas"></div>
    `);
  this.createMap();
};

App.loggedOutState = function(){
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.register();
};

App.register = function(e){
  if (e) e.preventDefault();
  this.$main.html(`
      <h2>Register</h2>
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
        <h2>Login</h2>
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
  console.log('shabba!');
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
