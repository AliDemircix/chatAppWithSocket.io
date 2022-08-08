import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './chat.css';
import { useLocation } from 'react-router';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;
const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users,setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';
  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    // this for sending data to backend
    socket.emit('join', { name, room }, () => {

    });
    // unmount use effect after disconnect it close socket.
    return () => {
      socket.on('roomData',({users})=>{
        setUsers(users);
      })
      socket.emit('disconnect');
   
      socket.off();
    }
  }, [ENDPOINT, location.search])

  //To get messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
    socket.on('roomData',({users})=>{
      setUsers(users);
    })
  }, [messages]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }
  console.log(message,messages)
  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room}></InfoBar>
        <Messages messages={messages} name={name}></Messages>
        <Input setMessage={setMessage} sendMessage={sendMessage} message={message}></Input>
      </div>
        <TextContainer users={users}></TextContainer>
    </div>
  )
}
export default Chat