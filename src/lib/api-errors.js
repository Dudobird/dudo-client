export function handleApiErrors(response){
    if(response.status >= 400  && response.message ){
        throw Error(response.message)
    }
    return response
}

export function handleResponseErrors(response){
    if(response.ok){
        return response.json()
    }else{
        throw Error("系统错误,请稍后再试:"+response.status)
    }
}

