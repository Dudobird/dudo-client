import React from 'react'

import PropTypes from 'prop-types';

function Message(props) {
  const { messages } = props;
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
    time: PropTypes.any,
}

export default Message