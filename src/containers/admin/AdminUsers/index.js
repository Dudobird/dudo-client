import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';

import { SearchBar } from '../../../components';
import ModalSwitch from '../../controller/modalSwitch'
import UserList from './UserList'
import {
  fetchUsers,
  deleteUser,
  settingUserStorageLimit,
  resetUserPassword,
} from '../actions'
import styles from '../styles.module.css';
import {
  showViewModal,
} from '../../controller/actions'

class AdminUsers extends Component {
  state = {
    searchItem: "",
    page: 0,
    size:20,
}
  componentDidMount(){
    this.props.fetchUsers(this.state.page,this.state.size,this.state.searchItem)
  }
  onSearch=()=>{
    this.props.fetchUsers(this.state.page,this.state.size,this.state.searchItem)
  }
  onSearchUpdate=(e)=>{
      const item = e.target.value.trim("")
      this.setState({searchItem:item})
  }
  onDeleteUser = ()=>{
    const userID = this.props.controller.modalData.id
    if(typeof userID === 'undefined'){
      NotificationManager.error('用户ID为空，请重新选择用户')
    }
    this.props.deleteUser(userID)
  }
  render() {
    return (
      <div >
          <SearchBar onSearch={this.onSearch} onChange={this.onSearchUpdate}/>
          <div className={styles.tableBox}>
            <UserList 
                users={this.props.admin.users} 
                onSetUserStorageLimit = {(id, currentLimit)=>this.props.showViewModal("showSettingUserLimit",{id,currentLimit})}
                onDeleteUser={(id,email,toggleSoftDelete)=>this.props.showViewModal("deleteUserModal",{id,email,toggleSoftDelete})}
                onResetPassword={(id)=>{this.props.showViewModal("resetUserPasswordModal",{id})}}
                onChangeStorageLimit={()=>{}}
            />
          </div>
          <ModalSwitch
                modalName={this.props.controller.modalName}
                onSettingUserLimit={this.props.settingUserStorageLimit}
                onResetUserPassword = {this.props.resetUserPassword}
                onDeleteUserSubmit ={this.onDeleteUser}
                onClose={() => this.props.showViewModal("")}
                {...this.props}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
    admin: state.admin,
    controller: state.controller,
})

export default connect(mapStateToProps,{
    fetchUsers,
    showViewModal,
    deleteUser,
    settingUserStorageLimit,
    resetUserPassword,
})(AdminUsers);

