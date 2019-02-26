
import { setClient } from '../containers/client/actions';

export function getToken(){
    const storedToken = localStorage.getItem("token")
    const token = JSON.parse(storedToken)
    return token.data.token
}

function checkAuthorization(dispatch){
    const storedToken = localStorage.getItem("token")
    if (storedToken){
        const token = JSON.parse(storedToken)
        const createdDate = new Date(token.data.CreatedAt)
        const created = Math.round(createdDate.getTime() / 1000)
        const ttl = 86400*7 // 一周后过期
        const expiry = created + ttl
        if (created > expiry){
            return false
        }
        dispatch(setClient(token))
        return true
    }
    return false
}

export function isAuthSuccess({dispatch,getState}){
    const client = getState().client;
    if(client && client.token){
        return true
    }
    if(checkAuthorization(dispatch)){
        return true
    }
    return false
}
export function checkStorageAuthorization({dispatch,getState}){
    return (nextState, replace, next)=>{
        const client = getState().client;
        if(client && client.token){
            return next()
        }
        if(checkAuthorization(dispatch)){
            return next()
        }
        replace('login')
        return next()
    }
}

export function checkIndexAuthorization({dispatch}){
    return (nextState, replace, next) =>{
        if(checkAuthorization(dispatch)){
            replace('widgets')
            return next()
        }
        replace("login")
        return next()
    }
}


