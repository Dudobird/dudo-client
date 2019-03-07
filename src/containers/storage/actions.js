import { 
    CREATE_NEW_FOLDER,
    SET_DEFAULT_STATUS,
    SWITCH_FOLDER,
    LIST_FILES,
    UPDATE_UPLOAD_LIST,
    UPLOAD_FILES,
    DOWNLOAD_FILE,
    CHANGE_DELETE_STATUS,
    DELETE_FILE,
    UPDATE_PENDING_DELETE_FILE,
} from './constants';

const updateUploadFiles = function updateUploadFiles(files){
    return {
        type: UPDATE_UPLOAD_LIST,
        files
    }
}

const changeDeleteStatus = function changeDeleteStatus(status){
    return {
        type: CHANGE_DELETE_STATUS,
        status,
    }
}

const downloadFile = function downloadFile(id,filename){
    return {
        type: DOWNLOAD_FILE,
        id,
        filename,
    }
}

const updatePendingDeleteFile = function updatePendingDeleteFile(id,filename){
    return {
        type: UPDATE_PENDING_DELETE_FILE,
        id,
    }
}


const deleteFile = function deleteFile(id,folderID){
    return {
        type: DELETE_FILE,
        id,
        folderID,
    }
}

const uploadfiles = function uploadfiles(files,folderID){
    return {
        type: UPLOAD_FILES,
        files,
        folderID,
    }
}

const createFolderRequest = function createFolderRequest({name,folderID}){
    return {
        type : CREATE_NEW_FOLDER,
        name,
        folderID,
    }
}

const listFiles = function listFiles(folderID){
    return {
        type: LIST_FILES,
        folderID
    }
}

const setDefaultStatus = function setDefaultStatus(){
    return {
        type : SET_DEFAULT_STATUS,
    }   
}

const switchFolder = function switchFolder(folderID){
    return {
        type: SWITCH_FOLDER,
        folderID
    }
}

export { 
    createFolderRequest ,
    setDefaultStatus,
    listFiles,
    switchFolder,
    updateUploadFiles,
    uploadfiles,
    downloadFile,
    changeDeleteStatus,
    deleteFile,
    updatePendingDeleteFile
}