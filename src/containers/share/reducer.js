import { 
    GET_SHARE_FILES, 
    GET_SHARE_FILES_SUCCESS, 
    GET_SHARE_FILES_FAIL, 
    DELETE_SHARE_FILE_SUCCESS,
    DELETE_SHARE_FILE_FAIL
} from "./constants";

const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
    files: [],
}

const reducer = function shareFileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SHARE_FILES:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [],
                errors: [],
            }
     
        case DELETE_SHARE_FILE_FAIL:
        case GET_SHARE_FILES_FAIL:
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
        case DELETE_SHARE_FILE_SUCCESS:
            return {
                ...state,
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
                files:state.files.filter(f=>f.id !== action.id)
            }           
        case GET_SHARE_FILES_SUCCESS:
            let files = []
            if (action.response && action.response.data && Array.isArray(action.response.data)) {
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
        default:
            return state
    }
}

export default reducer