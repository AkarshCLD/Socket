import React, { Component } from 'react'
import { io } from 'socket.io-client'
export default class App extends Component {
  constructor () {
    super()
    this.socket = io('http://localhost:5000/')
    this.socket.on('Client', data => {
      console.log(data)
    })
    this.socket.on('sendmsgtoall', data => {
      console.log(data)
    })
    this.socket.on('EXCLUSIVEBROADCAST', data => {
      console.log(data)
    })
    this.socket.on('JOINROOMSUCCESS', data => {
      console.log(data)
    })
    this.socket.on('sendtoroomMessage', data => {
      console.log(data)
    })
  }

  handelSendMess = () => {
    this.socket.emit('MESSAGE', 'client is sending')
  }
  handleBroadcast = () => {
    this.socket.emit('BROADCAST', 'broadcast to everyone')
  }
  handleEXCLUSIVEBroadcast = () => {
    this.socket.emit('EXCLUSIVEBROADCAST', 'Exclusive broadcast to everyone')
  }
  JoinRooms=()=>{
    this.socket.emit("JoinRoom","GROUP A")
  }
  sendmessagetoroom = () => {
    this.socket.emit('sendroommessage', 'messsage to all participants in room')
  }
  render () {
    return (
      <div>
        Socket client side
        <button onClick={this.handelSendMess}>Send Message</button>
        <hr/>
        <button onClick={this.handleBroadcast}>Send To all particpant</button>
        <hr/>
        <button onClick={this.handleEXCLUSIVEBroadcast}>
          Send To all EXCLUSIVEBROADCAST
        </button>
        <hr/>
        <button onClick={this.JoinRooms}>Send To join rooms</button>
        <hr/>
        <button onClick={this.sendmessagetoroom}>
          Send To all friends who have joined the room
        </button>
        <hr/>
      </div>
    )
  }
}
