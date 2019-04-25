import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import ProfileInfo from './ProfileInfo'
import Password from './Password'
import Billing from './Billing'
import styles from './style.module.css'

import {
  getUserProfile,
  updateProfileInfo,
  setDefaultStatus,
  changeUserPassword,
} from './actions'


class Profile extends Component {
  componentDidMount() {
    this.props.getUserProfile()
  }
  getSubPages = () => {
    const routers = [
      {
        path: "/",
        exact: true,
        main: () => <ProfileInfo
        onSubmit = {this.props.updateProfileInfo}
        profile={this.props.profile.profile}/>
  
      },
      {
        path: "/info",
        exact: true,
        main: () => <ProfileInfo
          onSubmit = {this.props.updateProfileInfo}
          profile={this.props.profile.profile}/>
      },
      {
        path: "/password",
        main: () => <Password 
        onSubmit = {this.props.changeUserPassword}
        />
      },
      {
        path: "/billing",
        main: () => <Billing profile={this.props.profile.profile}/>
      }
    ];
    return routers.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.main}
      />
    ))
  }

  getSideBar = () => {
    return (<div className="list-group">
      <NavLink to="/info" className="list-group-item">个人信息</NavLink>
      <NavLink to="/password" className="list-group-item">密码管理</NavLink>
      <NavLink to="/billing" className="list-group-item">配额信息</NavLink>
    </div>)
  }
  render() {
    if (this.props.profile.errors && this.props.profile.errors.length > 0) {
        NotificationManager.error(this.props.profile.errors[0].body)
        this.props.setDefaultStatus()
    }
    if ( this.props.profile.messages && this.props.profile.messages.length > 0) {
        NotificationManager.success(this.props.profile.messages[0].body)
        this.props.setDefaultStatus()
    }
    return (
      <Router basename="/profile">

        <div className={"container " + styles.profileBox}>
          <div className="row">
            <div className="col-md-3">
              {this.getSideBar()}
            </div>
            <div className="col-md-9">
              {this.getSubPages()}
            </div>
          </div>
          <NotificationContainer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(
  mapStateToProps,
  {
    updateProfileInfo,
    getUserProfile,
    setDefaultStatus,
    changeUserPassword
  })(Profile);
