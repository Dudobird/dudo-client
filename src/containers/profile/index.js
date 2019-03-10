import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import ProfileInfo from './ProfileInfo'
import Password from './Password'
import Billing from './Billing'
import styles from './style.module.css'

import {
  getUserProfile
} from './actions'

import {
  setDefaultStatus
} from '../storage/actions'

class Profile extends Component {
  componentDidMount() {
    this.props.getUserProfile()
  }
  getSubPages = () => {
    const routers = [
      {
        path: "/",
        exact: true,
        main: () => <ProfileInfo />
      },
      {
        path: "/password",
        main: () => <Password />
      },
      {
        path: "/billing",
        main: () => <Billing />
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
      <a href="/" className="list-group-item disabled">
        我的个人页面
    </a>
      <Link to="/" className="list-group-item">个人信息</Link>
      <Link to="/password" className="list-group-item">密码管理</Link>
      <Link to="/billing" className="list-group-item">配额设置</Link>
    </div>)
  }
  render() {
    if (this.props.profile.errors && this.props.profile.errors.length > 0) {
      NotificationManager.error(this.props.profile.errors[0].body)
      this.props.setDefaultStatus()
    }
    if (this.props.profile.messages && this.props.profile.messages.length > 0) {
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
    getUserProfile,
    setDefaultStatus,
  })(Profile);
