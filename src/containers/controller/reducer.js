
import {
    SHOW_VIEW_MODAL,
    FETCHING_START,
    FETCHING_SUCCESS,
    FETCHING_FAIL,
    SET_DEFAULT_STATUS,
    SWITCH_FOLDER
} from './constants'
const initialState = {
    modalName: "",
    currentFolderID: "root",
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
}

const reducer = function signupReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_VIEW_MODAL:
            return {
                ...state,
                modalName: action.modal,
            }
        case SWITCH_FOLDER:
            return {
                ...state,
                currentFolderID: action.folderID,
            }
        case SET_DEFAULT_STATUS:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: [],
                errors: [],                
            }
        case FETCHING_START:
            return{
                ...state,
                errors: [],
                messages: [],
                requesting: true,
                successful: false,
            }
        case FETCHING_SUCCESS:
            let messages = state.messages
            if(action.message){
                messages = messages.concat([{
                    body: action.message,
                    time: new Date()
                }])
            }
            return{
                    ...state,
                    errors: [],
                    messages: messages,
                    requesting: false,
                    successful: false,
            }
        case FETCHING_FAIL:
        return{
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