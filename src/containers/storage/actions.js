import { 
    CREATE_NEW_FOLDER,
    SET_DEFAULT_STATUS,
    SWITCH_PARENTID,
    LIST_FILES,

} from './constants';

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
}