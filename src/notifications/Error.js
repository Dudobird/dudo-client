import React from 'react'
import PropTypes from 'prop-types';


const Errors = (props) => {  
  const { errors } = props
  return (
    <div>
        {errors.map(error => (
          <div className="alert alert-danger" key={error.time}>
            {error.body}
          </div>
        ))}
    </div>
  )
}

Errors.propTypes = {  
  errors: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string,
        time: PropTypes.instanceOf(Date),
      })),
}

export default Errors  