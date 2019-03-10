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

