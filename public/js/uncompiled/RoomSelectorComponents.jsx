console.log('Room Selector Components loaded');

'use strict'

var RoomBoxComponent = React.createClass({
  render: function(){
    return (
      <h1>Room Box</h1>
    );
  }
});

var RoomCreateForm = React.createClass({
  render: function(){
    
  }
});



React.render(<RoomBoxComponent />, $('.roombox')[0]);

