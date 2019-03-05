
import {
    CREATE_NEW_FOLDER,
    CREATE_NEW_FOLDER_FAIL,
    CREATE_NEW_FOLDER_SUCCESS,
    SET_DEFAULT_STATUS,
    LIST_FILES,
    LIST_FILES_SUCCESS,
    LIST_FILES_FAIL,
    SWITCH_PARENTID,
    UPDATE_UPLOAD_LIST,
    UPLOAD_FILES_FAIL,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES,
} from './constants'

const initialState = {
    parentID: "",
    requesting: false,
    successful: false,
    message: [],
    error: [],
    files:[],
    uploadfiles: [],
}

const reducer = function signupReducer (state = initialState, action){
    switch(action.type){
        case SET_DEFAULT_STATUS:
            return {
                ...state,
                errors:[],
                messages:[],
                requesting:false,
                successful:false,
            }
        case LIST_FILES_SUCCESS:
            let files = []
            if(action.response && action.response.data && Array.isArray(action.response.data)){
                files = action.response.data
            }
            return {
                ...state,
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
                files
            }
        case LIST_FILES:
            return {
                ...state,
                parentID: action.parentID,
                requesting: true,
                successful: false,
                messages:[],
                errors: [],       
            }            
        case UPLOAD_FILES:
        case CREATE_NEW_FOLDER:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages:[],
                errors: [],       
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
        case CREATE_NEW_FOLDER_SUCCESS:{
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
        case SWITCH_PARENTID:
            return {
                ...state,
                parentID: action.parentID,
                files:[],
            }
        case UPDATE_UPLOAD_LIST:
            return {
                ...state,
                uploadfiles: action.files
            }
        // case 
        default: 
            return state 
    }
}
export default reducer;