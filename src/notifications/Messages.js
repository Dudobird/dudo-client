import React from 'react'

import PropTypes from 'prop-types';

function Message() {
  return (
    <div>
      <ul>
          {messages.map(message=>(
              <li key={message.time}>{message.body}</li>
          ))}
      </ul>
    </div>
  )
}

Message.propTypes = {
    messages: PropTypes.string,
    time: PropTypes.date,
}

export default Message