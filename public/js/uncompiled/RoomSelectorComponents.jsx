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


ChatApp.Components.UsernameModalComponent = React.createClass({
  componentDidMount: function(){
    this.node = this.getDOMNode();
    this.$modal = $(this.node);
    this.$main = $("<div><div class='ui orange huge header'>One step left!</div></div>");
    this.$content = $("<div class='ui content'></div>");
    this.$toReplace = $("<div></div>")
    this.$main.append(this.$content.append(this.$toReplace))
    this.$modal.append(this.$main)
    
    this.renderForm();

  },
  componentWillReceiveProps: function(props){
    if (props.open) {
      this.$modal.modal('show');
    } else {
      this.$modal.modal('hide modal');
    }
  },
  onDeny: function(){
    console.log('denied');
    this.$modal.modal('hide modal');
  },
  onApprove: function(){
    console.log('approved');
    this.$modal.modal('hide modal');
  },
  renderForm: function(){
    React.render(
        <div className="ui">
          <form className="ui form">
            <div className="six wide field">
              <label>Enter your handle</label>
              <input type="text" />
            </div>
          </form>          
            <div className="ui negative button" onClick={this.onDeny}>Cancel</div>
            <div className="ui positive right labeled icon button" onClick={this.onApprove}>
              Enter room
              <i className="checkmark icon"></i>
            </div>
        </div>,
        this.$toReplace[0]
    ) 
  },
  render: function(){
    return ( 
      <div className="username-form ui small modal grid" />
    )
  }
});

ChatApp.Components.RoomBoxComponent = React.createClass({
  getInitialState: function() {
    return { showForm: false };
  },
  showForm: function() {
        
  },
  componentDidMount: function(){
    this.props.collection.on('add remove change', this.forceUpdate.bind(this, null));
  },
  onFormSubmit: function(roomName){
    this.displayUsernameModal();
    
    var newRoomInfo = this.props.collection.create( { roomName: roomName, chatLog: {Room: "Welcome to " + roomName}, users: [userName] } );
  },
  displayUsernameModal: function(){
    this.setState({showForm: true});
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

    var modal = <ChatApp.Components.UsernameModalComponent open={this.state.showForm} />

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
          {modal}
      </div>
    );
  }
});

