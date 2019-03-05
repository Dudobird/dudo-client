import { 
    CREATE_NEW_FOLDER,
    SET_DEFAULT_STATUS,
    SWITCH_PARENTID,
    LIST_FILES,
    UPDATE_UPLOAD_LIST,
    UPLOAD_FILES,
    DOWNLOAD_FILE,

} from './constants';

const updateUploadFiles = function updateUploadFiles(files){
    return {
        type: UPDATE_UPLOAD_LIST,
        files
    }
}

const downloadFile = function downloadFile(id,filename){
    return {
        type: DOWNLOAD_FILE,
        id,
        filename,
    }
}
const uploadfiles = function uploadfiles(files,parentID){
    return {
        type: UPLOAD_FILES,
        files: files,
        parentID: parentID,
    }
}

const createFolderRequest = function createFolderRequest({name,parentID}){
    return {
        type : CREATE_NEW_FOLDER,
        name,
        parentID,
    }
}

const listFiles = function listFiles(parentID){
    return {
        type: LIST_FILES,
        parentID
    }
}

const setDefaultStatus = function setDefaultStatus(){
    return {
        type : SET_DEFAULT_STATUS,
    }   
}

const switchParentID = function switchParentID(parentID){
    return {
        type: SWITCH_PARENTID,
        parentID
    }
}

export { 
    createFolderRequest ,
    setDefaultStatus,
    listFiles,
    switchParentID,
    updateUploadFiles,
    uploadfiles,
    downloadFile
}