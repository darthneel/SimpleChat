console.log('Room Selector Components loaded');

'use strict'

var firebaseApp = "https://dncodechat.firebaseio.com/";

var RoomCreateForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var roomName = this.refs.room_name.getDOMNode().value.trim();
    this.refs.room_name.getDOMNode().value = '';

    console.log("Submit clicked");
    console.log(roomName);

    this.props. onFormSubmit(roomName);
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="room_name" />
        <button>Create</button>
      </form>
    );
  }
});


var RoomBoxComponent = React.createClass({
  mixins: [ReactFire],

  componentDidMount: function(){
    console.log(this.props.collection);

    this.bindAsArray(new Firebase(firebaseApp + "rooms"), "rooms");
  },
  onFormSubmit: function(text){
    var userName = this.displayUsernameModal();
    console.log(userName);
    this.firebaseRefs["rooms"].push({roomName: text, users: [userName]})
  },
  displayUsernameModal: function(){
    var userName = prompt("Enter your username")
    return userName;
  },
  render: function(){
    return (
      <div>
        <h1>Room Box</h1>
        <RoomCreateForm onFormSubmit={this.onFormSubmit} />
      </div>
    );
  }
});



React.render(<RoomBoxComponent collection={new ChatApp.Collections.RoomsCollection()} />, $('.roombox')[0]);

