
import {
    SHOW_VIEW_MODAL,
} from './constants'
const initialState = {
    modalName: "",
}

const reducer = function signupReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_VIEW_MODAL:
            return {
                ...state,
                modalName: action.modal,
            }
        default:
            return state
    }
}
export default reducer;