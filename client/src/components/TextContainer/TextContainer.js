import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './textContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
  
      <h1 className='roomTitle'>People in room <span role="img" aria-label="emoji">💬</span></h1>
    {
      users
        ? (
          <div className='onlineUsersContainer'>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    <img alt="Online Icon" src={onlineIcon}/>
                    {name}
                  </div>
                ))}
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;