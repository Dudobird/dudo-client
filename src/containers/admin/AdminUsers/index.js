import React, { Component } from 'react'
import { connect } from 'react-redux';
import { SearchBar } from '../../../components';
import UserList from './UserList'

import {fetchUsers} from '../actions'
import styles from '../styles.module.css';

class AdminUsers extends Component {
  componentDidMount(){
    this.props.fetchUsers()
  }
  render() {
    return (
      <div >
          <SearchBar onSearch={()=>{}} onChange={()=>{}}/>
          <div className={styles.tableBox}>
            <UserList 
                users={this.props.admin.users} 
                onDelete={()=>{}}
                onResetPassword={()=>{}}
            />
          </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
    admin: state.admin,
})

export default connect(mapStateToProps,{
    fetchUsers,
})(AdminUsers);

