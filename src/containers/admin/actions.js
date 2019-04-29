import {
    FETCH_USERS,
    DELETE_USER,
    SETTING_USER_LIMIT,
    RESET_USER_PASSWORD
} from './constants'

function fetchUsers(page=0,size=20,search=""){
    return {
        type: FETCH_USERS,
        page,
        size,
        search,
    }
}

function deleteUser(id){
    return {
        type: DELETE_USER,
        id
    }
}


function resetUserPassword(id, password){
    return {
        type: RESET_USER_PASSWORD,
        id,
        password
    }
}

function settingUserStorageLimit(id, readableSize){
    return {
        type: SETTING_USER_LIMIT,
        id,
        readableSize
    }
}

export {
    fetchUsers,
    deleteUser,
    settingUserStorageLimit,
    resetUserPassword
}