import { saveAs } from 'file-saver'

export function handleApiErrors(response) {
    if (response.status >= 400 && response.message) {
        throw Error(response.message)
    }
    return response
}

export function handleResponseErrors(response) {
    if (response.ok) {
        return response.json()
    } else {
        throw Error("系统错误,请稍后再试:" + response.status)
    }
}


function parseJSON(response) {
    return new Promise((resolve, reject) => {
        return response
            .json()
            .then(json => resolve({
                status: response.status,
                ok: response.ok,
                json,
            })
            )
    });
}

export function request(url, options) {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(parseJSON)
            .then(response => {
                if (response.ok) {
                    return resolve(response.json)
                }
                return reject(response.json.message);
            })
            .catch((error) => reject("服务出现异常:" + error.message))
    })
}

export function requestFile(url, options,isFolder,filename){
    return new Promise((resolve,reject)=>{
        fetch(url, options)
                .then(response =>{
                    if(response.status === 200 ){
                        return response.blob()
                    }
                    return response.json()
                }).then(object=>{
                    if (object.status){
                        // json response
                        throw(new Error(object.message))
                    }
                    return object
                })
                .then(blob => saveAs(blob, isFolder?filename+".zip":filename))
                .then(()=>resolve())
                .catch((error) => reject("错误:" + error.message))
    })
}