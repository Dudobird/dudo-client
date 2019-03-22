import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import style from './styles.module.css';
import FilesList from './fileslist'
import {
    createFolderRequest,
    switchFolder,
    listFiles,
    uploadfiles,
} from './actions';

import {
    showViewModal,
} from '../controller/actions'

import Popup from './Popup';
class Storage extends Component {
    state = {
        currentFolderID: "root",
    }
    static propTypes = {
        createFolderRequest: PropTypes.func,
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

    componentDidMount() {
        this.props.listFiles(this.state.currentFolderID)
    }
    render() {
        let renderFiles = [];
        if (this.props.storage.files && this.props.storage.files.length > 0) {
            renderFiles = this.props.storage.files
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className={style.container}>
                        <FilesList files={renderFiles} {...this.props}/>
                        <Popup
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
        switchFolder,
        listFiles,
        uploadfiles,
        showViewModal,
    })(Storage);