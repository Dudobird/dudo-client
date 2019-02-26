import { 
    CREATE_NEW_FOLDER,
    SET_DEFAULT_STATUS,

    LIST_FILES,

} from './constants';

const createFolderRequest = function createFolderRequest({name, isTopLevel,parentID}){
    return {
        type : CREATE_NEW_FOLDER,
        name,
        isTopLevel,
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

export { 
    createFolderRequest ,
    setDefaultStatus,
    listFiles,
}