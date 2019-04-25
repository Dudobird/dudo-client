import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import {GoDashboard,GoFile,GoPerson} from 'react-icons/go'
import AdminDashBoard from './AdminDashboard'
import AdminUsers from './AdminUsers'
import AdminFiles from './AdminFiles'
import styles from './styles.module.css'
import {} from './actions'

class Admin extends Component {
  componentDidMount() {
  
  }
  getSubPages = () => {
    const routers = [
      {
        path: "/",
        exact: true,
        main: () => <AdminDashBoard />
      },
      {
        path: "/dashboard",
        exact: true,
        main: () => <AdminDashBoard />
      },
      {
        path: "/users",
        main: () => <AdminUsers />
      },
      {
        path: "/files",
        main: () => <AdminFiles />
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
    return (
    <div className="list-group">
      <NavLink to="/dashboard" className="list-group-item"><GoDashboard/>&nbsp;管理面板</NavLink>
      <NavLink to="/users" className="list-group-item"><GoPerson/>&nbsp;用户管理</NavLink>
      <NavLink to="/files" className="list-group-item"><GoFile/>&nbsp;文件管理</NavLink>
    </div>)
  }
  render() {
    // if (this.props.profile.errors && this.props.profile.errors.length > 0) {
    //     NotificationManager.error(this.props.profile.errors[0].body)
    //     this.props.setDefaultStatus()
    // }
    // if ( this.props.profile.messages && this.props.profile.messages.length > 0) {
    //     NotificationManager.success(this.props.profile.messages[0].body)
    //     this.props.setDefaultStatus()
    // }
    return (
      <Router basename="/admin">
        <div className={"container " + styles.container}>
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
    // search: state.search,
})

export default connect(mapStateToProps,{})(Admin);
