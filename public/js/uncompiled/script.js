// window.$ = require('jquery');
// window._ = require('underscore');
// window.Backbone = require('Backbone');
// window.Backbone.$ = $;
window.React = require('react');
window.ReactFire = require('reactfire');
// window.Firebase = require('firebase');

var ChatApp = ChatApp || { Models: {}, Collections : {}, Router: {}, Components: {} };
ChatApp.loaded = false;
window.ChatApp = ChatApp;

require("./User");
require("./UsersCollection.js");



require("./Room");
require("./RoomsCollection.js");

// Components
require("./RoomSelectorComponents.jsx");

require("./router.jsx");

$(function(){

 // Backbone.history.start({pushState: true, root: '/'});
  Backbone.history.start();

});
