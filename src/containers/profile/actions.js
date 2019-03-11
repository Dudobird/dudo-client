import { 
    GET_USER_PROFILE,
    UPDATE_PROFILE_INFO,
    SET_DEFAULT_STATUS,
    UPDATE_USER_PASSWORD
} from "./constants";

export function setDefaultStatus(){
    return {
        type: SET_DEFAULT_STATUS
    }
}

export function getUserProfile() {
    return {
        type: GET_USER_PROFILE,
    }
}

export function updateProfileInfo(profile){
    return {
        type: UPDATE_PROFILE_INFO,
        profile
    }
}

export function changeUserPassword(data){
    return {
        type: UPDATE_USER_PASSWORD,
        data
    }
}