import { takeLatest, put, call} from 'redux-saga/effects';
import { handleApiErrors,getToken } from '../../lib'  
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
    DELETE_FILE_FAIL
} from './constants';




const createFolderApiUrl = `${process.env.REACT_APP_API_URL}/api/storages`
const uploadFileAPI = `${process.env.REACT_APP_API_URL}/api/upload/storage`
const downloadFileAPI = `${process.env.REACT_APP_API_URL}/api/download/storage`
const deleteFileAPI = `${process.env.REACT_APP_API_URL}/api/storage`

function listFolderFiles(parentID){
    const listTopFolderFiles =  `${process.env.REACT_APP_API_URL}/api/storages`
    let apiUrl = listTopFolderFiles;
    if(parentID && parentID !== ""){
        apiUrl = `${process.env.REACT_APP_API_URL}/api/storage/${parentID}/subfiles`
    }
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return fetch(apiUrl,{
            crossDomain:true,
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            }
        }
    ).then(response => response.json())
     .then(handleApiErrors)
     .then(json => json )
     .catch(error=>{throw error})    
}

function createFolderApi(name,parentID){
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return fetch(createFolderApiUrl,{
            crossDomain:true,
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body:JSON.stringify({
                file_name: name,
                parent_id: parentID,
                is_dir:true,
            })
        }
    ).then(response => response.json())
     .then(handleApiErrors)
     .then(json => json )
     .catch(error=>{throw error})
}

function uploadFiles(files,parentID){
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${uploadFileAPI}/${parentID}`
    return Promise.all(files.map(file =>{
        let formData = new FormData()
        formData.append("uploadfile",file)
        return fetch(apiUrl,{
                crossDomain:true,
                method: 'POST',
                headers:{
                    'Authorization':`Bearer ${token}`,
                },
                body: formData
            }).then(response => response.json())
            .then(handleApiErrors)
            .then(json => json )
        }
    )).then(jsons => jsons);
}

function downloadFile(id,filename){
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${downloadFileAPI}/${id}`
    return fetch(apiUrl,{
            crossDomain:true,
            method: 'GET',
            headers:{
                'Authorization':`Bearer ${token}`,
            }
        }).then(response => response.blob())
        .then(blob => saveAs(blob,filename) )
}


function deleteFile(id){
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${deleteFileAPI}/${id}`
    return fetch(apiUrl,{
            crossDomain:true,
            method: 'DELETE',
            headers:{
                'Authorization':`Bearer ${token}`,
            }
        }).then(response => response.json())
        .then(handleApiErrors)
        .then(json => json )
}

function* createFolderFlow(action){
    try {
        const { name, parentID } = action
        const response = yield call(createFolderApi, name,parentID)
        yield put({type: CREATE_NEW_FOLDER_SUCCESS, response})
        yield put({type: UPDATE_STORAGE_FILES,parentID})
    }catch(error){
        yield put({type: CREATE_NEW_FOLDER_FAIL, error})
    }
}

function* listFolderFlow(action){
    try {
        const { parentID } = action
        const response = yield call(listFolderFiles,parentID)
        yield put({type: LIST_FILES_SUCCESS, response})
        
    }catch(error){
        yield put({type: LIST_FILES_FAIL, error})
    }
}

function* downloadFileFlow(action){
    try {
        const { id,filename } = action
        const response = yield call(downloadFile,id,filename)
        yield put({type: DOWNLOAD_FILE_SUCCESS, response})
    }catch(error){
        yield put({type: DOWNLOAD_FILE_FAIL, error})
    }
}


function* uploadFilesFlow(action){
    try {
        const { files,parentID } = action
        const response = yield call(uploadFiles,files,parentID)
        yield put({type: UPLOAD_FILES_SUCCESS, response})
        yield put({type: LIST_FILES,parentID})
    }catch(error){
        yield put({type: UPLOAD_FILES_FAIL, error})
    }
}



function* deleteFileFlow(action){
    try {
        const { id ,parentID } = action
        const response = yield call(deleteFile,id)
        yield put({type: DELETE_FILE_SUCCESS, response})
        yield put({type: LIST_FILES,parentID})
    }catch(error){
        yield put({type: DELETE_FILE_FAIL, error})
    }
}

function* storageWatcher(){
    yield takeLatest(CREATE_NEW_FOLDER, createFolderFlow)
    yield takeLatest(UPDATE_STORAGE_FILES, listFolderFlow)
    yield takeLatest(LIST_FILES, listFolderFlow)
    yield takeLatest(DOWNLOAD_FILE, downloadFileFlow)
    yield takeLatest(UPLOAD_FILES, uploadFilesFlow)
    yield takeLatest(DELETE_FILE, deleteFileFlow)
}

export default storageWatcher;