console.log('Room Selector Components loaded');

'use strict'


var RoomCreateForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var roomName = this.refs.room_name.getDOMNode().value.trim();
    this.refs.room_name.getDOMNode().value = '';

    console.log("Submit clicked");
    this.props.onFormSubmit(roomName);
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

var RoomItemComponent = React.createClass({
  componentDidMount: function(){ 
    console.log("roomitemcomp mounted");
  },
  enterRoom: function(){
    console.log('Enter room');
  },
  render: function(){
    console.log('In room item render');
    return (
      <div onClick={this.enterRoom}>
        <h2>{this.props.roomName}</h2>
        <h3>Users</h3>
          {this.props.users.map(function(user){
             return <li>{user}</li>  
          })}
          <hr />
      </div>
    );
  }
});

var RoomBoxComponent = React.createClass({

  componentDidMount: function(){
    this.props.collection.on('add remove change', this.forceUpdate.bind(this, null));
  },
  onFormSubmit: function(roomName){
    var userName = this.displayUsernameModal();
    this.props.collection.add( {roomName: roomName, users: [userName]} );
  },
  displayUsernameModal: function(){
    var userName = prompt("Enter your username")
    return userName;
  },
  render: function(){
    console.log('in roombox render');
    var rooms = this.props.collection.models.map(function(room){
      return (
        <div>
            <RoomItemComponent key={room.id} roomName={room.get("roomName")} users={room.get("users")} />
        </div>
      ) 
    })

    var form = <RoomCreateForm onFormSubmit={this.onFormSubmit} />

    return (
      <div>
        <h1>Room Box</h1>
        <div>
          {form}
        </div>

          {rooms}

        <h3>Bottom</h3>
      </div>
    );
  }
});


var RoomBoxElement = React.render(<RoomBoxComponent collection={new ChatApp.Collections.RoomsCollection()} />, $('.roombox')[0]);
