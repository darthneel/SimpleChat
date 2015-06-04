
ChatApp.Router.AppRouter = Backbone.Router.extend({
  initialize: function(){
    console.log('router made');
      ChatApp.collection = new ChatApp.Collections.RoomsCollection()
      this.RoomBoxElement = React.render(<ChatApp.Components.RoomBoxComponent collection={ChatApp.collection} />, $('.main')[0]);
      ChatApp.loaded = !ChatApp.loaded;
  },
  routes: {
    "": "home",
    "rooms/:id": "rooms"
  }
});

router = new ChatApp.Router.AppRouter();

router.on('route:home', function(){

  console.log('home route');

});

router.on('route:rooms', function(id){
  console.log(id);
});
