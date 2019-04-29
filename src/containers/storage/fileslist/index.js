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
        controller: PropTypes.shape({
            modalName: PropTypes.string,
        }),
        storage: PropTypes.shape({
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
    submitCreateFolder = (folderName) => {
        const name = folderName.trim()
        if (name === "") {
            NotificationManager.error('请输入有效的文件名')
            return
        }
        if (name.length > 50) {
            NotificationManager.error('输入的文件名太长')
            return
        }
        this.props.createFolderRequest({
            name,
            folderID: this.props.controller.currentFolderID
        })
    }
    submitDeleteFile = () => {
        var folderID = "root"
        if (this.props.storage && this.props.storage.folderID !== "") {
            folderID = this.props.storage.folderID;
        }
        this.props.deleteFile(this.props.controller.modalData.id, folderID,this.afterSubmit)
    }
    submitRenameFile = (id,newName) => {
        if (newName.trim() === "") {
            NotificationManager.error("重命名不能为空")
            return
        }
        this.props.renameFile(
            id,
            newName.trim(),
            this.props.storage.folderID,
            this.afterSubmit
        )
    }
    submitShareFile = (id,days,descriptions) =>{
        this.props.shareFile(
            id,
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
        this.props.showViewModal("renameFileModal",{id,filename})
    }
    showShareFileModal = (id) => {
        if (id === "") {
            NotificationManager.error('待重命名文件找不到')
            return
        }
        this.props.showViewModal("shareFileModal",{id})
    }
    showDeleteFileModal = (id, filename) => {
        if (id === "") {
            NotificationManager.error('待删除文件找不到')
            return
        }
        this.props.showViewModal("deleteFileModal",{id,filename})
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
        updateUploadFiles,
        showViewModal
    })(FileList);