import { 
    UPDATE_SEARCH_ITEM,
    SEARCH_FILES_SUCCESS,
    CLEAR_SEARCH_RESULT,
} from "./constants";

const initialState = {
    search: "",
    files: [],
}

const reducer = function shareFileReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SEARCH_ITEM:
            return {
                ...state,
                search:action.search
            }
        case CLEAR_SEARCH_RESULT:
            return initialState
        case  SEARCH_FILES_SUCCESS:
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