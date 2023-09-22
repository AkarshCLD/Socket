import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Functional = () => {
  const [inputValue, setInputValue] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = io('http://localhost:5000/');

  useEffect(() => {
    socket.on('Client', (data) => {
      console.log(data);
    });
    socket.on('sendmsgtoall', (data) => {
      console.log(data);
    });
    socket.on('EXCLUSIVEBROADCAST', (data) => {
      console.log(data);
    });
    socket.on('sendroommessage', (data) => {
      console.log(data);
    });
    socket.on('JOINROOMSUCCESS', (data) => {
      console.log(data);
    });
  }, []); // Run this effect only once, on component mount

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    console.log(inputValue);
    socket.emit('MESSAGE', inputValue);
  };

  const handleBroadcast = () => {
    console.log(inputValue);
    socket.emit('BROADCAST', inputValue);
  };

  const handleExclusiveBroadcast = () => {
    socket.emit('EXCLUSIVEBROADCAST', inputValue);
  };

  const joinRoom = (e) => {
    e.preventDefault()
    let roomName = prompt('Please provide a room name:');
    socket.emit('JOINROOM', roomName);
  };

  const sendToRoom = () => {
    socket.emit('sendroommessage', inputValue);
  }
  return (
    <div>
      <div style={{textAlign:"center"}}>
        Socket client side
        <br/>
        <form>
        <input
          type='text'
          name='msg'
          value={inputValue}
          onChange={handleChange}
        /><hr/>
        <button style={{border:"2px solid black",backgroundColor:"pink", width:"300px"}} onClick={handleSendMessage}>Send Message</button>
        <hr />
        <button style={{border:"2px solid black",backgroundColor:"pink" , width:"300px"}} onClick={handleBroadcast}>Send To all participants</button>
        <hr />
        <button style={{border:"2px solid black",
        backgroundColor:"pink", width:"300px"}} onClick={handleExclusiveBroadcast}>
          Send To all EXCLUSIVEBROADCAST
        </button>
        <hr />
        <button style={{border:"2px solid black",backgroundColor:"pink", width:"300px"}} onClick={joinRoom}>Join Room</button>
        <hr />
        <button style={{border:"2px solid black",backgroundColor:"pink",width:"300px"}} onClick={sendToRoom}>
          Send To all friends who have joined the room
        </button>
        </form>
        <hr />
      </div>
    </div>
  );
};

export default Functional;


