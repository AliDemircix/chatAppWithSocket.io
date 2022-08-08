
import React from 'react';
import send from '../../icons/send.png'
import './input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}><img className='sendIcon' src={send} alt= 'send message'></img></button>
  </form>
)

export default Input;