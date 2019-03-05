import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import style from './styles.module.css';
import {
    Modal,
    StorageFiles,
    StorageFilesList,
    Dropbox} from '../../components';

import {
    createFolderRequest,
    setDefaultStatus,
    switchParentID,
    listFiles,
    updateUploadFiles,
    uploadfiles,
    downloadFile,
    changeDeleteStatus,
    deleteFile,
    updatePendingDeleteFile,
} from './actions';

import Popup from './Popup';
class Storage extends Component {
    state = {
        isShowCreateFolderModal: false,
        isShowUploadFolderModal: false,
        isShowDeleteFilesModal: false,
        newFolderName: "",
        currentParentID: "",
        deleteFileName:"",
    }
    static propTypes = {
        createFolderRequest: PropTypes.func,
        setDefaultStatus: PropTypes.func,
        storage: PropTypes.shape({
            deleteStatus: PropTypes.bool,
            pendingDeleteFile: PropTypes.string,
            isTopLevel: PropTypes.bool,
            files: PropTypes.array,
            parentID: PropTypes.string,
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
            uploadfiles: PropTypes.array,
            styleFileList: PropTypes.bool,
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
    toggleDeleteFilesModal=(showModel)=>{
        this.setState({
            isShowDeleteFilesModal:showModel
        })
    }
    handleInputChange=(e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitDeleteFile=()=>{
        var parentID = "root"
        if(this.props.storage && this.props.storage.parentID!==""){
            parentID = this.props.storage.parentID;
        }
        this.props.deleteFile(this.props.storage.pendingDeleteFile, parentID)
    }
    submitUploadFiles=()=>{
        if(this.props.storage.uploadfiles.length===0){
            NotificationManager.error('待上传文件列表为空')
            return 
        }
        var parentID = "root"
        if(this.props.storage && this.props.storage.parentID!==""){
            parentID = this.props.storage.parentID;
        }
        this.props.uploadfiles(this.props.storage.uploadfiles,parentID);
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
        if(parentID !== this.state.currentParentID){
            this.props.switchParentID(parentID)
            this.setState({currentParentID:parentID})
            this.props.listFiles(parentID)
        }
        
    }
    downloadFile =  (id,filename)=>{
        if(id!=="" && filename !== ""){
            this.props.downloadFile(id,filename)
            return
        }
        NotificationManager.error('待下载文件找不到')
    }
    showDeleteFileModal = (id,filename) =>{
        if(id===""){
            NotificationManager.error('待删除文件找不到')
            return
        }
        this.props.updatePendingDeleteFile(id)
        this.setState({
            isShowDeleteFilesModal:true,
            deleteFileName: filename,
        })
    }
    componentDidMount(){
        this.props.listFiles(this.state.currentParentID)
    }
    renderFilesWithStyle=()=>{
        let renderFilesContainer = null
        let renderFiles = [];
        if(this.props.storage.files && this.props.storage.files.length>0){
            renderFiles = this.props.storage.files
        }
        if(this.props.storage.styleFileList===true){
            renderFilesContainer = <StorageFilesList 
            deleteStatus={this.props.storage.deleteStatus} 
            files={renderFiles}
            deleteFile = {this.showDeleteFileModal}
            downloadFile={this.downloadFile}/>
        }else{
            renderFilesContainer =<StorageFiles 
                    deleteStatus={this.props.storage.deleteStatus} 
                    files={renderFiles}
                    deleteFile = {this.showDeleteFileModal}
                    downloadFile={this.downloadFile}/>
        }
        return renderFilesContainer
    }
    render(){
        if(this.props.storage.errors && this.props.storage.errors.length>0){
            NotificationManager.error(this.props.storage.errors[0].body)
            this.props.setDefaultStatus()
        }
        if(this.props.storage.messages && this.props.storage.messages.length>0){
            NotificationManager.success(this.props.storage.messages[0].body)
            this.props.setDefaultStatus()
            this.setState({
                isShowCreateFolderModal:false,
                isShowDeleteFilesModal:false,
                isShowUploadFolderModal:false
            })
        }


        return(
            <div className={style.container}>
                
                {this.renderFilesWithStyle()}
                <NotificationContainer/>
                <Popup 
                    onChangeDeleteStatus={()=>{this.props.changeDeleteStatus(true)}}
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
                    onSubmit={this.submitUploadFiles}
                    onClose={()=>{this.toggleUploadFilesModal(false)}}
                >
                    <Dropbox 
                        files={this.props.storage.uploadfiles}
                        updatefiles={this.props.updateUploadFiles}
                    />
                </Modal>               
                <Modal
                    title="删除文件"
                    show={this.state.isShowDeleteFilesModal}
                    onSubmit={this.submitDeleteFile}
                    onClose={()=>{this.toggleDeleteFilesModal(false)}}
                >
                   <div className={style.modalContent}>是否确定删除文件：<span className={style.modalContentSpan}>{this.state.deleteFileName}</span> ?</div>
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
        listFiles,
        updateUploadFiles,
        uploadfiles,
        downloadFile,
        changeDeleteStatus,
        deleteFile,
        updatePendingDeleteFile,
    })(Storage);