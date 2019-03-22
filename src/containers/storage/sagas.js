import { takeLatest, put, call } from 'redux-saga/effects';
import {
    getToken,
    request,

} from '../../lib'
import {
    b64EncodeUnicode
} from '../utils'

import { saveAs } from 'file-saver'
import {
    CREATE_NEW_FOLDER,
    LIST_FILES,
    LIST_FILES_SUCCESS,
    UPDATE_STORAGE_FILES,
    UPLOAD_FILES,
    DOWNLOAD_FILE,
    DELETE_FILE,
    REMOVE_SUCCESS_UPLOADED_FILES,
    RENAME_FILE,
    SHARE_FILE,
} from './constants';

import { SHOW_VIEW_MODAL, FETCHING_SUCCESS, FETCHING_FAIL, FETCHING_START } from '../controller/constants'



const folderApiUrl = `${process.env.REACT_APP_DUDO_API}/api/folders`
const uploadFileAPI = `${process.env.REACT_APP_DUDO_API}/api/upload/files`
const downloadFileAPI = `${process.env.REACT_APP_DUDO_API}/api/download/files`
const fileAPIUrl = `${process.env.REACT_APP_DUDO_API}/api/files`
const shareAPIUrl = `${process.env.REACT_APP_DUDO_API}/api/shares`
const sharePublicAPIUrl = `${process.env.REACT_APP_DUDO_API}/shares`

function listFolderFiles(folderID) {
    if (folderID === "") {
        folderID = "root"
    }
    const apiUrl = `${folderApiUrl}/${folderID}`
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return request(apiUrl, {
        crossDomain: true,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }
    )
}

function createFolderApi(name, folderID) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return request(folderApiUrl, {
        crossDomain: true,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            file_name: name,
            folder_id: folderID,
            is_dir: true,
        })
    }
    )
}

function uploadFile(file, folderID) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${uploadFileAPI}/${folderID}`
    let formData = new FormData()
    formData.append("uploadfile", file)
    return request(apiUrl, {
        crossDomain: true,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-FilePath':b64EncodeUnicode(file.path),
        },
        body: formData
    })
}

function downloadFile(id, filename) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${downloadFileAPI}/${id}`
    let isFolder = false
    if(id.startsWith("folder")){
        isFolder = true
    }
    return fetch(apiUrl, {
        crossDomain: true,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(response => response.blob())
        .then(blob => saveAs(blob, isFolder?filename+".zip":filename))
        .catch(error => { throw error })
}


function deleteFile(id) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${fileAPIUrl}/${id}`
    return request(apiUrl, {
        crossDomain: true,
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}

function renameFile(id, name) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${fileAPIUrl}/${id}`
    return request(apiUrl, {
        crossDomain: true,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            id: id,
            file_name: name,
        })
    })
}

function shareFile(id,days,description){
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${shareAPIUrl}`
    return request(apiUrl, {
        crossDomain: true,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            file_id: id,
            expire_days: days,
            description,
        })
    })    
}

function* createFolderFlow(action) {
    try {
        const { name, folderID } = action
        yield put({type: FETCHING_START})
        yield call(createFolderApi, name, folderID)
        yield put({type: FETCHING_SUCCESS, message:"创建文件夹成功"})
        yield put({ type: SHOW_VIEW_MODAL, modal:"" })
        yield put({ type: UPDATE_STORAGE_FILES, folderID })
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}

function* listFolderFlow(action) {
    try {
        const { folderID } = action
        yield put({type: FETCHING_START})
        const response = yield call(listFolderFiles, folderID)
        yield put({ type: LIST_FILES_SUCCESS, response })
        yield put({type: FETCHING_SUCCESS})
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}

function* downloadFileFlow(action) {
    try {
        const { id, filename,isFolder,cb } = action
        yield put({type: FETCHING_START})
        yield call(downloadFile, id, filename,isFolder)
        yield put({type: FETCHING_SUCCESS, message:"下载文件成功"})
        cb()
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}


function* uploadFilesFlow(action) {
    try {
        const { files, folderID } = action
        yield put({type: FETCHING_START})
        for (let f of files) {
            yield call(uploadFile, f, folderID)
            yield put({ type: REMOVE_SUCCESS_UPLOADED_FILES, path: f.path })
        }
        yield put({type: FETCHING_SUCCESS, message:"上传文件成功"})
        yield put({ type: LIST_FILES, folderID })
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}



function* deleteFileFlow(action) {
    try {
        const { id, folderID,cb } = action
        yield put({type: FETCHING_START})
        yield call(deleteFile, id)
        yield put({type: FETCHING_SUCCESS, message:"删除文件成功"})
        yield put({ type: SHOW_VIEW_MODAL, modal:"" })
        yield put({ type: LIST_FILES, folderID })
        cb()
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}

function* renameFileFlow(action) {
    try {
        const { id, name, folderID,cb } = action
        yield put({type: FETCHING_START})
        yield call(renameFile, id, name)
        yield put({type: FETCHING_SUCCESS, message:"文件重命名成功"})
        yield put({ type: SHOW_VIEW_MODAL, modal:"" })
        yield put({ type: LIST_FILES, folderID })
        cb()
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}


function* shareFileFlow(action) {
    try {
        const { id,days,description,cb } = action
        yield put({type: FETCHING_START})
        const response = yield call(shareFile, id,days,description)
        yield put({type: FETCHING_SUCCESS, message:"生成共享文件成功"})
        const token =  response && response.data && response.data.token; 
        window.$('#shareLinkInfoBox').removeClass('hidden')
        window.$('#shareLinkInfo').val(`${sharePublicAPIUrl}?token=${b64EncodeUnicode(token)}`)
        cb()
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}


function* storageWatcher() {
    yield takeLatest(CREATE_NEW_FOLDER, createFolderFlow)
    yield takeLatest(UPDATE_STORAGE_FILES, listFolderFlow)
    yield takeLatest(LIST_FILES, listFolderFlow)
    yield takeLatest(DOWNLOAD_FILE, downloadFileFlow)
    yield takeLatest(UPLOAD_FILES, uploadFilesFlow)
    yield takeLatest(DELETE_FILE, deleteFileFlow)
    yield takeLatest(RENAME_FILE, renameFileFlow)
    yield takeLatest(SHARE_FILE, shareFileFlow)
}

export default storageWatcher;