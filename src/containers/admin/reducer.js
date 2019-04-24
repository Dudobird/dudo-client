import { GET_USERS_LIST } from './constants'
const initialState = {
    users: [],
}
const reducer = function clientReducer(state = initialState,action){
    switch(action.type){
        case GET_USERS_LIST:
        return {
            ...state,
            users: action.users,
            
        }
        default:
        return state
    }
}

export default reducer