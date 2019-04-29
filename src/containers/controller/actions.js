import { 
    SHOW_VIEW_MODAL,
    SET_DEFAULT_STATUS,
    SWITCH_FOLDER
} from './constants';


const showViewModal = function showViewModal(modalName,data){
    return {
        type: SHOW_VIEW_MODAL,
        modal: modalName,
        data
    }
} 

const setDefaultStatus = function setDefaultStatus(){
    return {
        type: SET_DEFAULT_STATUS,
    }   
}

const switchFolder = function switchFolder(folderID){
    return {
        type: SWITCH_FOLDER,
        folderID
    }
}

export {
    switchFolder,
    showViewModal,
    setDefaultStatus
}