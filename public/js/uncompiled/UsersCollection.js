ChatApp.Collections.UsersCollection = Backbone.Firebase.Collection.extend({
  model: ChatApp.Models.User,
  initialize: function(models, options){
    this.roomURL = options.roomUrl
    // debugger
  },
  autoSync: true,
  url: function(){

    return this.roomURL + '/users'
  }
});
