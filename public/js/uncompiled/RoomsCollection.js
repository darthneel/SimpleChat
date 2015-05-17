ChatApp.Collections.RoomsCollection = Backbone.Firebase.Collection.extend({
  model: ChatApp.Models.Room,
  url: "https://dncodechat.firebaseio.com/rooms",
  autoSync: true
});