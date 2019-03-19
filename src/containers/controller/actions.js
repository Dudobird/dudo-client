import { 
    SHOW_VIEW_MODAL,

} from './constants';


const showViewModal = function showViewModal(modalName){
    return {
        type: SHOW_VIEW_MODAL,
        modal: modalName,
    }
} 

export {
    showViewModal
}