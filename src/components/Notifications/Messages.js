import React from 'react'

import PropTypes from 'prop-types';

function Message(props) {
  const { messages } = props;
  return (
    <div>
          {messages.map(message=>(
            <div className="alert alert-success" key={message.time}>
              {message.body}
            </div>
          ))}
    </div>
  )
}

Message.propTypes = {
    messages: PropTypes.string,
    time: PropTypes.instanceOf(Date),
}

export default Message