function appStart(){
  ChatApp.collection = new ChatApp.Collections.RoomsCollection()
  var RoomBoxElement = React.render(<ChatApp.Components.RoomBoxComponent collection={ChatApp.collection} />, $('.roombox')[0]);
  ChatApp.loaded = !ChatApp.loaded;
};

// function loadCheck(){
//   Chatapp.loaded ? return : appStart()
// };

ChatApp.Router.AppRouter = Backbone.Router.extend({
  initialize: function(){
    console.log('router made');
    appStart();
  },
  routes: {
    "": "home",
    "rooms/:id": "rooms"
  }
});

var router = new ChatApp.Router.AppRouter();

router.on('route:home', function(){
  // if (!ChatApp.loaded) {
  //   loadCheck()
  // };

  console.log('home route');

});

router.on('route:rooms', function(id){
  console.log('rooms route')
  console.log(id);
});
