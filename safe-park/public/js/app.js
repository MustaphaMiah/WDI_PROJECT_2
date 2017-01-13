"use strict";var App=App||{},google=google;App.init=function(){this.apiUrl="http://localhost:3000/api",this.$main=$("main"),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),$(".home").on("click",this.homepage.bind(this)),this.$main.on("submit","form",this.handleForm),this.getToken()?this.loggedInState():this.loggedOutState()},App.createMap=function(){var e=document.getElementById("canvas"),o={zoom:14,center:new google.maps.LatLng(51.506178,(-.088369)),mapTypeId:google.maps.MapTypeId.ROADMAP};App.map=new google.maps.Map(e,o),this.getCrimes()},App.getCrimes=function(){var e=this;$.get("https://data.police.uk/api/crimes-street/all-crime?lat=51.506178&lng=-0.088369&date=2016-01").done(function(o){var n=o.filter(function(e){return"vehicle-crime"===e.category});e.loopThroughArray(n)})},App.loopThroughArray=function(e){$.each(e,function(e,o){App.addMarkerForCrime(o)})},App.addMarkerForCrime=function(e){console.log(e),console.log(parseFloat(e.location.latitude)),console.log(parseFloat(e.location.longitude));var o=new google.maps.LatLng(parseFloat(e.location.latitude),parseFloat(e.location.longitude)),n=new google.maps.Marker({position:o,map:App.map});App.addInfoWindowForCrime(e,n)},App.addInfoWindowForCrime=function(e,o){var n=this;google.maps.event.addListener(o,"click",function(){"undefined"!=typeof n.infoWindow&&n.infoWindow.close(),n.infoWindow=new google.maps.InfoWindow({content:'\n      <div class="info-window">\n      <img src='+e.image+"><p>"+e.name+"</p>\n      </div>\n      "}),n.infoWindow.open(n.map,o)})},App.loggedInState=function(){console.log("loggedin"),$(".loggedIn").show(),$(".loggedOut").hide(),this.$main.html('\n    <div id="canvas"></div>\n    '),this.createMap.bind(this)()},App.loggedOutState=function(){$(".loggedIn").hide(),$(".loggedOut").show(),this.register()},App.register=function(e){e&&e.preventDefault(),this.$main.html('\n      <h2>Register</h2>\n      <form method="post" action="/register">\n      <div class="form-group">\n      <input class="form-control" type="text" name="user[username]" placeholder="Username">\n      </div>\n      <div class="form-group">\n      <input class="form-control" type="email" name="user[email]" placeholder="Email">\n      </div>\n      <div class="form-group">\n      <input class="form-control" type="password" name="user[password]" placeholder="Password">\n      </div>\n      <div class="form-group">\n      <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">\n      </div>\n      <input class="btn btn-primary" type="submit" value="Register">\n      </form>\n      ')},App.login=function(e){e.preventDefault(),this.$main.html('\n        <h2>Login</h2>\n        <form method="post" action="/login">\n        <div class="form-group">\n        <input class="form-control" type="email" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n        <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <input class="btn btn-primary" type="submit" value="Login">\n        </form>\n        ')},App.logout=function(e){e.preventDefault(),this.removeToken(),this.loggedOutState()},App.homepage=function(){},App.handleForm=function(e){e.preventDefault();var o=""+App.apiUrl+$(this).attr("action"),n=$(this).attr("method"),t=$(this).serialize();return App.ajaxRequest(o,n,t,function(e){e.token&&App.setToken(e.token),App.loggedInState()})},App.ajaxRequest=function(e,o,n,t){return $.ajax({url:e,method:o,data:n,beforeSend:this.setRequestHeader.bind(this)}).done(t).fail(function(e){console.log(e)})},App.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+this.getToken())},App.setToken=function(e){return window.localStorage.setItem("token",e)},App.getToken=function(){return window.localStorage.getItem("token")},App.removeToken=function(){return window.localStorage.clear()},$(App.init.bind(App));