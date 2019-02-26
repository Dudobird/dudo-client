import {
    CREATE_NEW_FOLDER,
    CREATE_NEW_FOLDER_FAIL,
    CREATE_NEW_FOLDER_SUCCESS,
    SET_DEFAULT_STATUS,
    LIST_FILES,
    LIST_FILES_SUCCESS,
    LIST_FILES_FAIL,
} from './constants'

const initialState = {
    parentID: "",
    requesting: false,
    successful: false,
    message: [],
    error: [],
    files:[],
}

const reducer = function signupReducer (state = initialState, action){
    switch(action.type){
        case SET_DEFAULT_STATUS:
            return {
                ...state,
                error:[],
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
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
                files
            }
        case LIST_FILES:
        case CREATE_NEW_FOLDER:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages:[],
                errors: [],       
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
        default: 
        return state 
    }
}

export default reducer;