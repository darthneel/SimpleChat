window.$ = require('jquery');
window._ = require('underscore');
window.Backbone = require('Backbone');
window.Backbone.$ = $;
window.React = require('react');
window.ReactFire = require('reactfire');

var ChatApp = ChatApp || { Models: {}, Collections : {}, Router: {}, Components: {} };
window.ChatApp = ChatApp;

// Models
require("./Room");
require("./User");

// Collections
require("./RoomsCollection.js");
require("./UsersCollection.js");


// Components
require("./RoomSelectorComponents.jsx");
