import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import style from './styles.module.css';
import {Modal,StorageFiles,Dropbox} from '../../components';

import {
    createFolderRequest,
    setDefaultStatus,
    switchParentID,
    listFiles
} from './actions';

import Popup from './Popup';
class Storage extends Component {
    state = {
        isShowCreateFolderModal: false,
        isShowUploadFolderModal: false,
        newFolderName: "",
        currentParentID: "",
    }
    static propTypes = {
        createFolderRequest: PropTypes.func,
        setDefaultStatus: PropTypes.func,
        storage: PropTypes.shape({
            isTopLevel: PropTypes.bool,
            files: PropTypes.array,
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
    toggleUploadFilesModal=(showModel)=>{
        this.setState({
            isShowUploadFolderModal:showModel
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
            parentID: this.state.currentParentID
        })
    }
    componentWillReceiveProps(nextProps){
        let parentID = ""
        if (nextProps.match.params && nextProps.match.params.id){
            parentID = nextProps.match.params.id
        }
        console.log(nextProps.match.params)
        console.log(parentID,this.state.currentParentID)
        if(parentID !== this.state.currentParentID){
            this.props.switchParentID(parentID)
            this.setState({currentParentID:parentID})
            this.props.listFiles(parentID)
        }
        
    }
    componentDidMount(){
        this.props.listFiles(this.state.currentParentID)
    }
    render(){
        if(this.props.storage.errors && this.props.storage.errors.length>0){
            NotificationManager.error(this.props.storage.errors[0].body)
            this.props.setDefaultStatus()
        }
        if(this.props.storage.messages && this.props.storage.messages.length>0){
            NotificationManager.success(this.props.storage.messages[0].body)
            this.props.setDefaultStatus()
            this.setState({isShowCreateFolderModal:false})
        }
        let renderFiles = [];
        if(this.props.storage.files && this.props.storage.files.length>0){
            renderFiles = this.props.storage.files
        }
        return(
            <div className={style.container}>
                <StorageFiles files={renderFiles}/>
                <NotificationContainer/>
                <Popup 
                    onCreateFolder={()=>{this.toggleCreateFolderModal(true)}}
                    onUploadFiles={()=>{this.toggleUploadFilesModal(true)}}
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

                <Modal
                    title="上传文件"
                    show={this.state.isShowUploadFolderModal}
                    onSubmit={this.submitCreateFolder}
                    onClose={()=>{this.toggleUploadFilesModal(false)}}
                >
                    <Dropbox/>
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
        switchParentID,
        listFiles
    })(Storage);