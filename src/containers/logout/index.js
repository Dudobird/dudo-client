import React, { Component } from 'react'
import { connect }from 'react-redux';
import logoutRequest from './actions';

class Logout extends Component {
  componentDidMount(){
    this.props.logoutRequest()       
  }
  render() {
    return (
      <div>
          
      </div>
    )
  }
}

export default connect(null, {logoutRequest})(Logout)