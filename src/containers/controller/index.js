import React, { Component } from 'react'
import { connect } from 'react-redux';
import NotifyBox from './notification';
import {setDefaultStatus} from './actions';
import Loading from '../../components/Loading'

class Controller extends Component {
  render() {
    return (
      <div>
        <Loading hidden={!this.props.controller.requesting}/>
        <NotifyBox 
            setDefaultStatus = {this.props.setDefaultStatus}
            controller = {this.props.controller}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    controller: state.controller,
})

export default connect(mapStateToProps,{
    setDefaultStatus
})(Controller);