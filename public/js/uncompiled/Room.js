ChatApp.Models.Room = Backbone.Model.extend({
  defaults: {
    roomName: "",
  },
  initialize: function(){
    console.log('new room model created');
  }
});

