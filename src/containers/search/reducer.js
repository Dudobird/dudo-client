import { 
    UPDATE_SEARCH_ITEM
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
        default:
            return state
    }
}

export default reducer