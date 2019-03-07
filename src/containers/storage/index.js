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
    switchFolder,
    listFiles,
    updateUploadFiles,
    uploadfiles,
    downloadFile,
    changeDeleteStatus,
    toggleControlMode,
    deleteFile,
    updatePendingDeleteFile,
    toggleFileDisplayStyle,
} from './actions';

import Popup from './Popup';
class Storage extends Component {
    state = {
        isShowCreateFolderModal: false,
        isShowUploadFolderModal: false,
        isShowDeleteFilesModal: false,
        newFolderName: "",
        currentFolderID: "root",
        deleteFileName:"",
    }
    static propTypes = {
        createFolderRequest: PropTypes.func,
        setDefaultStatus: PropTypes.func,
        storage: PropTypes.shape({
            pendingDeleteFile: PropTypes.string,
            isTopLevel: PropTypes.bool,
            files: PropTypes.array,
            folderID: PropTypes.string,
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
            uploadfiles: PropTypes.array,
            fileListMode: PropTypes.bool,
            controlMode: PropTypes.bool,
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
        var folderID = "root"
        if(this.props.storage && this.props.storage.folderID!==""){
            folderID = this.props.storage.folderID;
        }
        this.props.deleteFile(this.props.storage.pendingDeleteFile, folderID)
    }
    submitUploadFiles=()=>{
        if(this.props.storage.uploadfiles.length===0){
            NotificationManager.error('待上传文件列表为空')
            return 
        }
        var folderID = "root"
        if(this.props.storage && this.props.storage.folderID!==""){
            folderID = this.props.storage.folderID;
        }
        this.props.uploadfiles(this.props.storage.uploadfiles,folderID);
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
            folderID: this.state.currentFolderID
        })
    }
    componentWillReceiveProps(nextProps){
        let folderID = "root"
        if (nextProps.match.params && nextProps.match.params.id){
            folderID = nextProps.match.params.id
        }
        if(folderID !== this.state.currentFolderID){
            this.props.switchFolder(folderID)
            this.setState({currentFolderID:folderID})
            this.props.listFiles(folderID)
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
        this.props.listFiles(this.state.currentFolderID)
    }
    renderFilesWithStyle=()=>{
        let renderFilesContainer = null
        let renderFiles = [];
        if(this.props.storage.files && this.props.storage.files.length>0){
            renderFiles = this.props.storage.files
        }
        if(this.props.storage.fileListMode===true){
            renderFilesContainer = <StorageFilesList 
            controlMode={this.props.storage.controlMode} 
            files={renderFiles}
            deleteFile = {this.showDeleteFileModal}
            downloadFile={this.downloadFile}/>
        }else{
            renderFilesContainer =<StorageFiles 
                    controlMode={this.props.storage.controlMode} 
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
                    onToggleFileDisplayStyle = {this.props.toggleFileDisplayStyle}
                    onToggleControlMode={this.props.toggleControlMode}
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
                        <form className="form-inline">
                            <div className="form-group">
                                <label htmlFor="newfolder">文件夹名称: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
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
        switchFolder,
        listFiles,
        updateUploadFiles,
        uploadfiles,
        downloadFile,
        changeDeleteStatus,
        toggleControlMode,
        deleteFile,
        updatePendingDeleteFile,
        toggleFileDisplayStyle,
    })(Storage);