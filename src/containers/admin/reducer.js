import { FETCH_USERS_SUCCESS } from './constants'
const initialState = {
    users: [],
}
const reducer = function clientReducer(state = initialState,action){
    switch(action.type){
        case FETCH_USERS_SUCCESS:
        return {
            ...state,
            users: action.response && action.response.data,
        }
        default:
        return state
    }
}

export default reducer