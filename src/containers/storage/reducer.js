
import {
    CREATE_NEW_FOLDER,
    CREATE_NEW_FOLDER_FAIL,
    CREATE_NEW_FOLDER_SUCCESS,
    SET_DEFAULT_STATUS,
    LIST_FILES,
    LIST_FILES_SUCCESS,
    LIST_FILES_FAIL,
    SWITCH_FOLDER,
    UPDATE_UPLOAD_LIST,
    UPLOAD_FILES_FAIL,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES,
    UPDATE_PENDING_DELETE_FILE,
    UPDATE_PENDING_RENAME_FILE,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_FAIL,
    TOGGLE_FILE_DISPLAY_STYLE,
    TOGGLE_CONTROL_MODE,
    SHOW_VIEW_MODAL,
    RENAME_FILE_SUCCESS,
    RENAME_FILE,
    RENAME_FILE_FAIL,
    REMOVE_SUCCESS_UPLOADED_FILES,
} from './constants'

const initialState = {
    folderID: "root",
    pendingDeleteFileID: "",
    pendingDeleteFileName: "",
    pendingRenameFileID: "",
    pendingRenameFileName: "",
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
    files: [],
    uploadfiles: [],
    fileListMode: true,
    controlMode: false,
    modalName: "",

}

const reducer = function signupReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_VIEW_MODAL:
            return {
                ...state,
                modalName: action.modal,
            }
        case TOGGLE_FILE_DISPLAY_STYLE:
            return {
                ...state,
                fileListMode: !state.fileListMode
            }
        case TOGGLE_CONTROL_MODE:
            return {
                ...state,
                controlMode: !state.controlMode
            }
        case UPDATE_PENDING_DELETE_FILE:
            return {
                ...state,
                errors: [],
                messages: [],
                requesting: false,
                successful: false,
                pendingDeleteFileID: action.id,
                pendingDeleteFileName: action.filename,
            }
        case UPDATE_PENDING_RENAME_FILE:
            return {
                ...state,
                errors: [],
                messages: [],
                requesting: false,
                successful: false,
                pendingRenameFileID: action.id,
                pendingRenameFileName: action.filename,
            }
        case SET_DEFAULT_STATUS:
            return {
                ...state,
                errors: [],
                messages: [],
                requesting: false,
                successful: false,
            }
        case LIST_FILES_SUCCESS:
            let files = []
            if (action.response && action.response.data && Array.isArray(action.response.data)) {
                files = action.response.data
            }
            return {
                ...state,
                modalName: "",
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
                files
            }
        case LIST_FILES:
            return {
                ...state,
                folderID: action.folderID,
                requesting: true,
                successful: false,
                messages: [],
                errors: [],
            }
        case RENAME_FILE:
        case UPLOAD_FILES:
        case CREATE_NEW_FOLDER:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [],
                errors: [],
            }
        case RENAME_FILE_SUCCESS:
            return {
                ...state,
                errors: [],
                messages: [{
                    body: "文件重命名成功",
                    time: new Date()
                }],
                requesting: false,
                successful: true,
            }
        case DELETE_FILE_SUCCESS: {
            return {
                ...state,
                errors: [],
                messages: [{
                    body: "删除文件成功",
                    time: new Date()
                }],
                requesting: false,
                successful: true,
            }
        }
        case REMOVE_SUCCESS_UPLOADED_FILES: {
            return {
                ...state,
                uploadfiles: state.uploadfiles.filter(f => f.path !== action.path)
            }
        }
        case UPLOAD_FILES_SUCCESS: {
            return {
                ...state,
                errors: [],
                messages: [{
                    body: "上传文件成功",
                    time: new Date()
                }],
                requesting: false,
                successful: true,
            }
        }
        case CREATE_NEW_FOLDER_SUCCESS: {
            return {
                ...state,
                errors: [],
                messages: [{
                    body: "创建文件夹成功",
                    time: new Date()
                }],
                requesting: false,
                successful: true,
            }
        }
        case RENAME_FILE_FAIL:
        case DELETE_FILE_FAIL:
        case UPLOAD_FILES_FAIL:
        case LIST_FILES_FAIL:
        case CREATE_NEW_FOLDER_FAIL:
            return {
                ...state,
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date()
                }]),
                messages: [],
                requesting: false,
                successful: false,
            }
        case SWITCH_FOLDER:
            return {
                ...state,
                deleteStatus: false,
                folderID: action.folderID,
                files: [],
                messages: [],
                errors: [],
            }
        case UPDATE_UPLOAD_LIST:
            return {
                ...state,
                uploadfiles: action.files,
                messages: [],
                errors: [],
            }
        // case 
        default:
            return state
    }
}
export default reducer;