import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ModalSwitch from '../controller/modalSwitch';
import style from './styles.module.css';
import {
    StorageFiles,
    StorageFilesList,
} from '../../components';

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
    toggleFileDisplayStyle,
} from './actions';

import {
    showViewModal
} from '../controller/actions'

import Popup from './Popup';
class Storage extends Component {
    state = {
        newFolderName: "",
        currentFolderID: "root",
        deleteFileName: "",
        modalName: "",
    }
    static propTypes = {
        createFolderRequest: PropTypes.func,
        setDefaultStatus: PropTypes.func,
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
            folderID: this.state.currentFolderID
        })
    }
    componentWillReceiveProps(nextProps) {
        let folderID = "root"
        if (nextProps.match.params && nextProps.match.params.id) {
            folderID = nextProps.match.params.id
        }
        if (folderID !== this.state.currentFolderID) {
            this.props.switchFolder(folderID)
            this.setState({ currentFolderID: folderID })
            this.props.listFiles(folderID)
        }

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
    componentDidMount() {
        this.props.listFiles(this.state.currentFolderID)
    }
    renderFilesWithStyle = () => {
        let renderFilesContainer = null
        let renderFiles = [];
        if (this.props.storage.files && this.props.storage.files.length > 0) {
            renderFiles = this.props.storage.files
        }
        if (this.props.storage.fileListMode === true) {
            renderFilesContainer = <StorageFilesList
                controlMode={this.props.storage.controlMode}
                files={renderFiles}
                renameFile={this.showRenameFileModal}
                deleteFile={this.showDeleteFileModal}
                shareFile = {this.showShareFileModal}
                downloadFile={this.downloadFile} />
                
        } else {
            renderFilesContainer = <StorageFiles
                controlMode={this.props.storage.controlMode}
                files={renderFiles}
                renameFile={this.showRenameFileModal}
                shareFile = {this.showShareFileModal}
                deleteFile={this.showDeleteFileModal}
                downloadFile={this.downloadFile} />
        }
        return renderFilesContainer
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
        if (this.props.storage.errors && this.props.storage.errors.length > 0) {
            NotificationManager.error(this.props.storage.errors[0].body)
            this.props.setDefaultStatus()
        }
        if (this.props.storage.messages && this.props.storage.messages.length > 0) {
            NotificationManager.success(this.props.storage.messages[0].body)
            this.props.setDefaultStatus()
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className={style.container}>
                        {this.renderFilesWithStyle()}
                        {this.renderModal()}
                        <NotificationContainer />
                        <Popup
                            onToggleFileDisplayStyle={this.props.toggleFileDisplayStyle}
                            onToggleControlMode={this.props.toggleControlMode}
                            onCreateFolder={() => { this.props.showViewModal("newFolderModal") }}
                            onUploadFiles={() => { this.props.showViewModal("uploadFilesModal") }}
                        />
                    </div>
                </div>
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
        toggleFileDisplayStyle,
        showViewModal
    })(Storage);