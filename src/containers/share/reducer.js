import { 
    GET_SHARE_FILES_SUCCESS, 
    DELETE_SHARE_FILE_SUCCESS,
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
        case DELETE_SHARE_FILE_SUCCESS:
            return {
                ...state,
                files:state.files.filter(f=>f.id !== action.id)
            }           
        case GET_SHARE_FILES_SUCCESS:
            let files = []
            if (action.response && action.response.data && Array.isArray(action.response.data)) {
                files = action.response.data
            }
            return {
                ...state,
                files
            }
        default:
            return state
    }
}

export default reducer