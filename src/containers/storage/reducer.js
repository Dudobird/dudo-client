
import {
    LIST_FILES,
    LIST_FILES_SUCCESS,
    SWITCH_FOLDER,
    UPDATE_PENDING_DELETE_FILE,
    UPDATE_PENDING_RENAME_FILE,
    UPDATE_PENDING_SHARE_FILE,
    REMOVE_SUCCESS_UPLOADED_FILES,
} from './constants'

const initialState = {
    folderID: "root",
    pendingDeleteFileID: "",
    pendingDeleteFileName: "",
    pendingShareFileID:"",
    pendingRenameFileID: "",
    pendingRenameFileName: "",
    files: [],
    uploadfiles: [],
}

const reducer = function signupReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PENDING_DELETE_FILE:
            return {
                ...state,
                pendingDeleteFileID: action.id,
                pendingDeleteFileName: action.filename,
            }
        case UPDATE_PENDING_SHARE_FILE:
            return {
                ...state,
                pendingShareFileID: action.id,
            }            
        case UPDATE_PENDING_RENAME_FILE:
            return {
                ...state,
                pendingRenameFileID: action.id,
                pendingRenameFileName: action.filename,
            }
        case LIST_FILES_SUCCESS:
            let files = []
            if (action.response && action.response.data && Array.isArray(action.response.data)) {
                files = action.response.data
            }
            return {
                ...state,
                modalName: "",
                files
            }
        case LIST_FILES:
            return {
                ...state,
                folderID: action.folderID,
            }
        case REMOVE_SUCCESS_UPLOADED_FILES: {
            return {
                ...state,
                uploadfiles: state.uploadfiles.filter(f => f.path !== action.path)
            }
        }
        case SWITCH_FOLDER:
            return {
                ...state,
                deleteStatus: false,
                folderID: action.folderID,
            }
        default:
            return state
    }
}
export default reducer;