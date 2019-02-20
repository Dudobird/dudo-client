import { CLIENT_SET , CLIENT_UNSET} from './constants'

export function setClient(token,userID) {
    return {
        type: CLIENT_SET,
        token,
        userID,
    }
}

export function unsetClient(token){
    return {
        type: CLIENT_UNSET
    }
}