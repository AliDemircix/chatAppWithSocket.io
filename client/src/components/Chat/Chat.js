import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './chat.css';
import { useLocation } from 'react-router';

let socket;
const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';
  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    // this for sending data to backend
    socket.emit('join', {name,room},()=> {
      
    });
    // unmount use effect after disconnect it close socket.
    return ()=> {
      socket.emit('disconnect');

      socket.off();
    }
  },[ENDPOINT,location.search])
  return (
    <div>Chat</div>
  )
}
export default Chat