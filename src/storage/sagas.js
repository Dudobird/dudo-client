import { takeLatest, put, call} from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors'  
import { 
    CREATE_NEW_FOLDER,
    CREATE_NEW_FOLDER_SUCCESS,
    CREATE_NEW_FOLDER_FAIL,
    LIST_FILES,
    LIST_FILES_SUCCESS,
    LIST_FILES_FAIL,
} from './constants';
import {getToken} from './../lib';

const createFolderApiUrl = `${process.env.REACT_APP_API_URL}/api/storages`

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

function* createFolderFlow(action){
    try {
        const { name, isTopLevel, parentID } = action
        const response = yield call(createFolderApi, name, isTopLevel,parentID)
        yield put({type: CREATE_NEW_FOLDER_SUCCESS, response})
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


function* storageWatcher(){
    yield takeLatest(CREATE_NEW_FOLDER, createFolderFlow)
    yield takeLatest(LIST_FILES, listFolderFlow)
}

export default storageWatcher;