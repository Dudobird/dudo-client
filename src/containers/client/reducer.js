import { CLIENT_SET, CLIENT_UNSET } from './constants'
const initialState = {
    id: null,
    token: null,
    admin: false,
}
function isAdmin(token){
    console.log(token)
    if(token && token.data && typeof token.data.roleid === 'number'){
        return token.data.roleid === 1
    }
    return false
}
const reducer = function clientReducer(state = initialState,action){
    switch(action.type){
        case CLIENT_SET:
        localStorage.setItem('token',JSON.stringify(action.token))
        localStorage.setItem('admin',JSON.stringify(isAdmin(action.token)))
        return {
            userID: action.userID,
            token: action.token,
            admin:  isAdmin(action.token)
        }
        case CLIENT_UNSET:
        return {
            id: null,
            token: null
        }
        default:
        return state
    }
}

export default reducer