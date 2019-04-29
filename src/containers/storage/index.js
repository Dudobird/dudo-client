import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import style from './styles.module.css';
import FilesList from './fileslist'
import {
    createFolderRequest,
    listFiles,
    uploadfiles,
} from './actions';

import {
    switchFolder,
    showViewModal,
} from '../controller/actions'

import Popup from './Popup';
class Storage extends Component {
    static propTypes = {
        createFolderRequest: PropTypes.func,
        controller: PropTypes.shape({
            modalName: PropTypes.string,
            currentFolderID: PropTypes.string,
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
    submitUploadFiles = () => {
        if (this.props.storage.uploadfiles.length === 0) {
            NotificationManager.error('待上传文件列表为空')
            return
        }

        this.props.uploadfiles(this.props.storage.uploadfiles,  this.props.controller.currentFolderID);
    }
    componentWillReceiveProps(nextProps) {
        let folderID = "root"
        if (nextProps.match.params && nextProps.match.params.id) {
            folderID = nextProps.match.params.id
        }
        if (folderID !== this.props.controller.currentFolderID) {
            this.props.switchFolder(folderID)
            this.props.listFiles(folderID)
        }
    }

    componentDidMount() {
        this.props.listFiles(this.props.controller.currentFolderID)
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