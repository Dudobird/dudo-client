import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import style from './styles.module.css';
import { Modal } from './../components'
// import File from './Files'
// import Folder from './Folders'
import {
    createFolderRequest,
    setDefaultStatus,
    listFiles
} from './actions';

import Popup from './Popup';
class Storage extends Component {
    state = {
        isShowCreateFolderModal: false,
        newFolderName: ""
    }
    static propTypes = {
        createFolderRequest: PropTypes.func,
        setDefaultStatus: PropTypes.func,
        storage: PropTypes.shape({
            isTopLevel: PropTypes.bool,
            parentID: PropTypes.string,
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
        }),
    }
 
    toggleCreateFolderModal=(showModel)=>{
        this.setState({
            isShowCreateFolderModal:showModel
        })
    }
    handleInputChange=(e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitCreateFolder=()=>{
        const name = this.state.newFolderName.trim()
        if(name===""){
            NotificationManager.error('请输入有效的文件名')
            return 
        }
        if(name.length>50){
            NotificationManager.error('输入的文件名太长')
            return            
        }
        this.props.createFolderRequest({
            name,
            isTopLevel: this.props.storage.isTopLevel,
            parentID: this.props.storage.parentID
        })
    }
    componentDidMount(){
        this.props.listFiles(this.props.storage.parentID)
    }
    render(){
        if(this.props.storage.errors && this.props.storage.errors.length>0){
            NotificationManager.error(this.props.storage.errors[0].body)
            this.props.setDefaultStatus()
        }
        if(this.props.storage.messages && this.props.storage.messages.length>0){
            NotificationManager.info(this.props.storage.messages[0].body)
            this.props.setDefaultStatus()
        }
        return(
            <div className={style.container}>
                <NotificationContainer/>
                <Popup 
                    onCreateFolder={()=>{this.toggleCreateFolderModal(true)}}
                />
                <Modal
                    title="新建文件夹"
                    show={this.state.isShowCreateFolderModal}
                    onSubmit={this.submitCreateFolder}
                    onClose={()=>{this.toggleCreateFolderModal(false)}}
                >
                    <div className={style.createFolderModel}>
                        <form class="form-inline">
                            <div class="form-group">
                                <label for="newfolder">文件夹名称: </label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="newFolderName" 
                                    value={this.state.newFolderName}
                                    onChange={this.handleInputChange}/>
                            </div>
                        </form> 
                    </div>                   
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    storage: state.storage,
})

export default connect(
    mapStateToProps, 
    {
        createFolderRequest,
        setDefaultStatus,
        listFiles
    })(Storage);