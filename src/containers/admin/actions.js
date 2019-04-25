import {FETCH_USERS} from './constants'

function fetchUsers(page=0,size=20,search=""){
    return {
        type: FETCH_USERS,
        page,
        size,
        search,
    }
}
export {
    fetchUsers
}