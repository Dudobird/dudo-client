
import {
    LIST_FILES,
    LIST_FILES_SUCCESS,
    REMOVE_SUCCESS_UPLOADED_FILES,
    UPDATE_UPLOAD_LIST
} from './constants'

const initialState = {
    files: [],
    uploadfiles: [],
}

const reducer = function signupReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_UPLOAD_LIST:
            return{
                ...state,
                uploadfiles:action.files
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
        default:
            return state
    }
}
export default reducer;