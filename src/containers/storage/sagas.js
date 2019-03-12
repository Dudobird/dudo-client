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
    CREATE_NEW_FOLDER_SUCCESS,
    CREATE_NEW_FOLDER_FAIL,
    LIST_FILES,
    LIST_FILES_SUCCESS,
    LIST_FILES_FAIL,
    UPDATE_STORAGE_FILES,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES_FAIL,
    UPLOAD_FILES,
    DOWNLOAD_FILE,
    DOWNLOAD_FILE_SUCCESS,
    DOWNLOAD_FILE_FAIL,
    DELETE_FILE,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_FAIL,
    REMOVE_SUCCESS_UPLOADED_FILES,
    RENAME_FILE,
    RENAME_FILE_SUCCESS,
    RENAME_FILE_FAIL
} from './constants';




const folderApiUrl = `${process.env.REACT_APP_DUDO_API}/api/folders`
const uploadFileAPI = `${process.env.REACT_APP_DUDO_API}/api/upload/files`
const downloadFileAPI = `${process.env.REACT_APP_DUDO_API}/api/download/files`
const fileAPIUrl = `${process.env.REACT_APP_DUDO_API}/api/files`

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
    return fetch(apiUrl, {
        crossDomain: true,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(response => response.blob())
        .then(blob => saveAs(blob, filename))
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


function* createFolderFlow(action) {
    try {
        const { name, folderID } = action
        const response = yield call(createFolderApi, name, folderID)
        yield put({ type: CREATE_NEW_FOLDER_SUCCESS, response })
        yield put({ type: UPDATE_STORAGE_FILES, folderID })
    } catch (error) {
        yield put({ type: CREATE_NEW_FOLDER_FAIL, error })
    }
}

function* listFolderFlow(action) {
    try {
        const { folderID } = action
        const response = yield call(listFolderFiles, folderID)
        yield put({ type: LIST_FILES_SUCCESS, response })

    } catch (error) {
        yield put({ type: LIST_FILES_FAIL, error })
    }
}

function* downloadFileFlow(action) {
    try {
        const { id, filename } = action
        const response = yield call(downloadFile, id, filename)
        yield put({ type: DOWNLOAD_FILE_SUCCESS, response })
    } catch (error) {
        yield put({ type: DOWNLOAD_FILE_FAIL, error })
    }
}


function* uploadFilesFlow(action) {
    try {
        const { files, folderID } = action
        for (let f of files) {
            yield call(uploadFile, f, folderID)
            yield put({ type: REMOVE_SUCCESS_UPLOADED_FILES, path: f.path })
        }
        yield put({ type: UPLOAD_FILES_SUCCESS, response: "upload success" })
        yield put({ type: LIST_FILES, folderID })
    } catch (error) {
        yield put({ type: UPLOAD_FILES_FAIL, error })
    }
}



function* deleteFileFlow(action) {
    try {
        const { id, folderID } = action
        const response = yield call(deleteFile, id)
        yield put({ type: DELETE_FILE_SUCCESS, response })
        yield put({ type: LIST_FILES, folderID })
    } catch (error) {
        yield put({ type: DELETE_FILE_FAIL, error })
    }
}

function* renameFileFlow(action) {
    try {
        const { id, name, folderID } = action
        const response = yield call(renameFile, id, name)
        yield put({ type: RENAME_FILE_SUCCESS, response })
        yield put({ type: LIST_FILES, folderID })
    } catch (error) {
        yield put({ type: RENAME_FILE_FAIL, error })
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
}

export default storageWatcher;