import React, { Component } from 'react'
import ModalSwitch from '../../controller/modalSwitch';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import {
    StorageFilesList,
} from '../../../components';

import {
    showViewModal,
} from '../../controller/actions'


import {
    uploadfiles,
    downloadFile,
    shareFile,
    changeDeleteStatus,
    deleteFile,
    renameFile,
    updatePendingDeleteFile,
    updatePendingRenameFile,
    updatePendingShareFileID,
    updateUploadFiles,
} from '../actions';

class FileList extends Component {
    static propTypes = {
        uploadfiles: PropTypes.func,
        downloadFile: PropTypes.func,
        shareFile: PropTypes.func,
        changeDeleteStatus: PropTypes.func,
        renameFile: PropTypes.func,
        deleteFile: PropTypes.func,
        updatePendingDeleteFile: PropTypes.func,
        updatePendingRenameFile: PropTypes.func,
        updatePendingShareFileID: PropTypes.func,
        controller: PropTypes.shape({
            modalName: PropTypes.string,
        }),
        storage: PropTypes.shape({
            pendingDeleteFileID: PropTypes.string,
            pendingDeleteFileName: PropTypes.string,
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
    // 用于其他组件执行自定义刷新或者检查操作
    afterSubmit = () =>{
        if(this.props.afterSubmit && typeof this.props.afterSubmit === 'function'){
            this.props.afterSubmit();
        }
    }
    submitDeleteFile = () => {
        var folderID = "root"
        if (this.props.storage && this.props.storage.folderID !== "") {
            folderID = this.props.storage.folderID;
        }
        this.props.deleteFile(this.props.storage.pendingDeleteFileID, folderID,this.afterSubmit)
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
            this.afterSubmit
        )
    }
    submitShareFile = (days,descriptions) =>{
        this.props.shareFile(
            this.props.storage.pendingShareFileID,
            days,
            descriptions,
            this.afterSubmit
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
            this.props.downloadFile(id, filename,this.afterSubmit)
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
  render() {
    return (
      <div>
            <StorageFilesList
                files={this.props.files}
                renameFile={this.showRenameFileModal}
                deleteFile={this.showDeleteFileModal}
                shareFile = {this.showShareFileModal}
                downloadFile={this.downloadFile} />
           <ModalSwitch
                modalName={this.props.controller.modalName}
                onNewFolderSubmit={this.submitCreateFolder}
                onUploadModalSubmit={this.submitUploadFiles}
                onDeleteModalSubmit={this.submitDeleteFile}
                onRenameModalSubmit={this.submitRenameFile}
                onShareFileSubmit = {this.submitShareFile}
                onClose={() => this.props.showViewModal("")}
                {...this.props}
        />
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
        uploadfiles,
        downloadFile,
        changeDeleteStatus,
        deleteFile,
        renameFile,
        shareFile,
        updatePendingDeleteFile,
        updatePendingRenameFile,
        updatePendingShareFileID,
        updateUploadFiles,
        showViewModal
    })(FileList);