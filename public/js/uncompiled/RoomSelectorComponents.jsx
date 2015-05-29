ChatApp.Components.RoomCreateForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var roomName = this.refs.room_name.getDOMNode().value.trim();
    this.refs.room_name.getDOMNode().value = '';

    console.log("Submit clicked");
    this.props.onFormSubmit(roomName);
  },
  render: function(){
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="six wide field">
          <label>Create a new room</label>
          <input type="text" ref="room_name" />
        </div>
        <button className="ui submit button">Create</button>
      </form>
    );
  }
});

ChatApp.Components.RoomItemComponent = React.createClass({
  componentDidMount: function(){ 
    console.log("roomitemcomp mounted");
  },
  enterRoom: function(){

    Backbone.history.navigate('/rooms/' + this.props.id, {trigger: true});
  },
  render: function(){
    console.log('In room item render');
    return (
      <div className="content" onClick={this.enterRoom}>
        <h2>{this.props.roomName}</h2>
          <div className="ui list">
            {this.props.users.map(function(user){
              return (
                <div className="item">
                  <i className="right triangle icon"></i><div className="content">{user}</div>  
                </div>
              )
            })}
          </div>
      </div>
    );
  }
});

ChatApp.Components.RoomBoxComponent = React.createClass({
  componentDidMount: function(){
    this.props.collection.on('add remove change:roomName', this.forceUpdate.bind(this, null));
  },
  onFormSubmit: function(roomName){
    var userName = this.displayUsernameModal();
    
    var newRoomInfo = this.props.collection.create( { roomName: roomName, chatLog: {Room: "Welcome to " + roomName}, users: [userName] } );
  },
  displayUsernameModal: function(){
    var userName = prompt("Enter your username")
    return userName;
  },
  render: function(){
    console.log('in roombox render');
    var rooms = this.props.collection.models.map(function(room){
      return (
        <div className="card">
          <ChatApp.Components.RoomItemComponent key={room.id} id={room.id} roomName={room.get("roomName")} users={room.get("users")} />
        </div>
      ) 
    })

    var form = <ChatApp.Components.RoomCreateForm onFormSubmit={this.onFormSubmit} />

    return (
      <div>
         <div className= "ui orange huge header">SIMPLE.chat</div>
        <div>
          {form}
        </div>
        <br />
        <div className="ui link cards">
          {rooms}
        </div>
      </div>
    );
  }
});

