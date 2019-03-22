import React, { Component } from 'react'
import ModalSwitch from '../../controller/modalSwitch';

import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';


import {
    showViewModal,
} from '../../controller/actions'


import {
    createFolderRequest,
    setDefaultStatus,
    switchFolder,
    listFiles,
    updateUploadFiles,
    uploadfiles,
    downloadFile,
    shareFile,
    changeDeleteStatus,
    toggleControlMode,
    deleteFile,
    renameFile,
    updatePendingDeleteFile,
    updatePendingRenameFile,
    updatePendingShareFileID,
} from '../actions';

class FileList extends Component {

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitDeleteFile = () => {
        var folderID = "root"
        if (this.props.storage && this.props.storage.folderID !== "") {
            folderID = this.props.storage.folderID;
        }
        this.props.deleteFile(this.props.storage.pendingDeleteFileID, folderID)
    }
    submitRenameFile = (newName) => {
        if (newName.trim() === "") {
            NotificationManager.error("重命名不能为空")
            return
        }
        this.props.renameFile(
            this.props.storage.pendingRenameFileID,
            newName.trim(),
            this.props.storage.folderID,
        )
    }
    submitShareFile = (days,descriptions) =>{
        this.props.shareFile(
            this.props.storage.pendingShareFileID,
            days,
            descriptions,
        )
    }
    submitUploadFiles = () => {
        if (this.props.storage.uploadfiles.length === 0) {
            NotificationManager.error('待上传文件列表为空')
            return
        }
        var folderID = "root"
        if (this.props.storage && this.props.storage.folderID !== "") {
            folderID = this.props.storage.folderID;
        }
        this.props.uploadfiles(this.props.storage.uploadfiles, folderID);
    }
    downloadFile = (id, filename) => {
        if (id !== "" && filename !== "") {
            this.props.downloadFile(id, filename)
            return
        }
        NotificationManager.error('待下载文件找不到')
    }
    showRenameFileModal = (id, filename) => {
        if (id === "") {
            NotificationManager.error('待重命名文件找不到')
            return
        }
        this.props.updatePendingRenameFile(id, filename)
        this.props.showViewModal("renameFileModal")
    }
    showShareFileModal = (id) => {
        if (id === "") {
            NotificationManager.error('待重命名文件找不到')
            return
        }
        this.props.updatePendingShareFileID(id)
        this.props.showViewModal("shareFileModal")
    }
    showDeleteFileModal = (id, filename) => {
        if (id === "") {
            NotificationManager.error('待删除文件找不到')
            return
        }
        this.props.updatePendingDeleteFile(id, filename)
        this.props.showViewModal("deleteFileModal")
    }
  renderModal = () => {
        return <ModalSwitch
            modalName={this.props.controller.modalName}
            onNewFolderSubmit={this.submitCreateFolder}
            onUploadModalSubmit={this.submitUploadFiles}
            onDeleteModalSubmit={this.submitDeleteFile}
            onRenameModalSubmit={this.submitRenameFile}
            onShareFileSubmit = {this.submitShareFile}
            onClose={() => this.props.showViewModal("")}
            {...this.props}
        />
  }
  render() {
    return (
      <div>
           {this.renderFilesWithStyle()}
           {this.renderModal()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    storage: state.storage,
    controller: state.controller,
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
        renameFile,
        shareFile,
        updatePendingDeleteFile,
        updatePendingRenameFile,
        updatePendingShareFileID,
        showViewModal
    })(FileList);