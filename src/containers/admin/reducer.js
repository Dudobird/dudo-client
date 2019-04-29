import { FETCH_USERS_SUCCESS, DELETE_USER_SUCCESS } from './constants'
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
        case DELETE_USER_SUCCESS:
        const userID = action.id
        const users = state.users.map(u => {
            if(u.id === userID){
                u.isSoftDeleted = !u.isSoftDeleted
            }
            return u
        })
        return {
            ...state,
            users: users
        }
        default:
            return state
    }
}

export default reducer