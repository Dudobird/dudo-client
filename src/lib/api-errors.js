export function handleApiErrors(response){
    if(response.status >= 400  && response.message ){
        throw Error(response.message)
    }
    return response
}