import React, { Component } from 'react'
import {connect} from 'react-redux';
import {} from './actions'
class Admin extends Component {
  
  render() {
    return (
      <div>
          Admin
      </div>
    )
  }
}
const mapStateToProps = state => ({
    search: state.search,
})

export default connect(mapStateToProps,{})(Admin);
