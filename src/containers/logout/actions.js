import {
    LOGOUT_REQUESTING
} from './constants'

const logoutRequest = function logoutRequest(){
    return {
        type: LOGOUT_REQUESTING,
    }
}

export default logoutRequest