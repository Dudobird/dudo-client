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
    DELETE_FILE_FAIL,
    REMOVE_SUCCESS_UPLOADED_FILES
} from './constants';




const createFolderApiUrl = `${process.env.REACT_APP_DUDO_API}/api/folders`
const uploadFileAPI = `${process.env.REACT_APP_DUDO_API}/api/upload/files`
const downloadFileAPI = `${process.env.REACT_APP_DUDO_API}/api/download/files`
const deleteFileAPI = `${process.env.REACT_APP_DUDO_API}/api/files`

function listFolderFiles(folderID){
    if(folderID ===""){
        folderID = "root"
    }
    const apiUrl = `${createFolderApiUrl}/${folderID}`
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

function createFolderApi(name,folderID){
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
                folder_id: folderID,
                is_dir:true,
            })
        }
    ).then(response => response.json())
     .then(handleApiErrors)
     .then(json => json )
     .catch(error=>{throw error})
}

 function uploadFile(file,folderID){
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${uploadFileAPI}/${folderID}`

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
        const { name, folderID } = action
        const response = yield call(createFolderApi, name,folderID)
        yield put({type: CREATE_NEW_FOLDER_SUCCESS, response})
        yield put({type: UPDATE_STORAGE_FILES,folderID})
    }catch(error){
        yield put({type: CREATE_NEW_FOLDER_FAIL, error})
    }
}

function* listFolderFlow(action){
    try {
        const { folderID } = action
        const response = yield call(listFolderFiles,folderID)
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
        const { files,folderID } = action
        for(let f of files){
            yield call(uploadFile,f,folderID)
            yield put({type: REMOVE_SUCCESS_UPLOADED_FILES,path:f.path})
        }
        yield put({type: UPLOAD_FILES_SUCCESS, response:"upload success"})
        yield put({type: LIST_FILES,folderID})
    }catch(error){
        yield put({type: UPLOAD_FILES_FAIL, error})
    }
}



function* deleteFileFlow(action){
    try {
        const { id ,folderID } = action
        const response = yield call(deleteFile,id)
        yield put({type: DELETE_FILE_SUCCESS, response})
        yield put({type: LIST_FILES,folderID})
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