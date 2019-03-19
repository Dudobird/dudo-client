import { 
    SHOW_VIEW_MODAL,
    SET_DEFAULT_STATUS
} from './constants';


const showViewModal = function showViewModal(modalName){
    return {
        type: SHOW_VIEW_MODAL,
        modal: modalName,
    }
} 

const setDefaultStatus = function setDefaultStatus(){
    return {
        type: SET_DEFAULT_STATUS,
    }   
}
export {
    showViewModal,
    setDefaultStatus
}