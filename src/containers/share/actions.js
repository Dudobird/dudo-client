import {
    GET_SHARE_FILES, DELETE_SHARE_FILE,
} from './constants';

const getShareFiles = function getShareFiles(){
    return {
        type: GET_SHARE_FILES,
    }
} 
const deleteShareFile = function deleteShareFile(id){
    return {
        type: DELETE_SHARE_FILE,
        id
    }
} 


export {
    getShareFiles,
    deleteShareFile
}