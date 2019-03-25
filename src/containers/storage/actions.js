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
    UPDATE_PENDING_RENAME_FILE,
    TOGGLE_FILE_DISPLAY_STYLE,
    TOGGLE_CONTROL_MODE,
    RENAME_FILE,
    SHARE_FILE,
    UPDATE_PENDING_SHARE_FILE,
} from './constants';

const toggleFileDisplayStyle = function toggleFileDisplayStyle(){
    return {
        type: TOGGLE_FILE_DISPLAY_STYLE,
    }
} 

const toggleControlMode = function toggleControlMode(){
    return {
        type: TOGGLE_CONTROL_MODE,
    }
} 

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

const downloadFile = function downloadFile(id,filename,cb){
    return {
        type: DOWNLOAD_FILE,
        id,
        filename,
        cb
    }
}


const shareFile = function shareFile(id,days,description,cb){
    return {
        type: SHARE_FILE,
        id,
        days,
        description,
        cb
    }
}
const updatePendingDeleteFile = function updatePendingDeleteFile(id,filename){
    return {
        type: UPDATE_PENDING_DELETE_FILE,
        id,
        filename,
    }
}

const updatePendingRenameFile = function updatePendingRenameFile(id,filename){
    return {
        type: UPDATE_PENDING_RENAME_FILE,
        id,
        filename,
    }
}

const updatePendingShareFileID = function updatePendingShareFile(id){
    return {
        type: UPDATE_PENDING_SHARE_FILE,
        id,
    }
}





const deleteFile = function deleteFile(id,folderID,cb){
    return {
        type: DELETE_FILE,
        id,
        folderID,
        cb
    }
}
const renameFile = function renameFile(id,name,folderID,cb){
    return {
        type: RENAME_FILE,
        id,
        name,
        folderID,
        cb
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



export { 
    createFolderRequest ,
    setDefaultStatus,
    listFiles,
    updateUploadFiles,
    uploadfiles,
    downloadFile,
    changeDeleteStatus,
    deleteFile,
    updatePendingDeleteFile,
    updatePendingRenameFile,
    updatePendingShareFileID,
    toggleFileDisplayStyle,
    toggleControlMode,
    renameFile,
    shareFile,
}