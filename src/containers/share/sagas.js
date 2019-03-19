import { takeLatest, put, call } from 'redux-saga/effects';
import {
    getToken,
    request,

} from '../../lib'
import { 
    GET_SHARE_FILES,
    GET_SHARE_FILES_SUCCESS,
    DELETE_SHARE_FILE,
    DELETE_SHARE_FILE_SUCCESS,
} from './constants';

import {
    FETCHING_FAIL,
    FETCHING_SUCCESS,
    FETCHING_START,
} from './../controller/constants'

const shareFilesAPIUrl = `${process.env.REACT_APP_DUDO_API}/api/shares`
const shareFileAPIUrl = `${process.env.REACT_APP_DUDO_API}/api/share`
function getShareFiles(){
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${shareFilesAPIUrl}`
    return request(apiUrl, {
        crossDomain: true,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })    
}


function deleteShareFileAPI(id){
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const apiUrl = `${shareFileAPIUrl}/`+id
    return request(apiUrl, {
        crossDomain: true,
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })       
}

function* getShareFilesFlow(){
    try {
        yield put({type: FETCHING_START})
        const response = yield call(getShareFiles)
        yield put({ type: GET_SHARE_FILES_SUCCESS, response })
        yield put({type: FETCHING_SUCCESS})
    } catch (error) {
        yield put({type: FETCHING_FAIL,error})
    }
}

function* deleteShareFilesFlow(action){
    try {
        const { id } = action
        yield put({type: FETCHING_START})
        const response = yield call(deleteShareFileAPI,id)
        yield put({ type: DELETE_SHARE_FILE_SUCCESS, id,response })
        yield put({type: FETCHING_SUCCESS})
    } catch (error) {
        yield put({type: FETCHING_FAIL,error})
    }
}

function* storageWatcher() {
    yield takeLatest(GET_SHARE_FILES, getShareFilesFlow)
    yield takeLatest(DELETE_SHARE_FILE, deleteShareFilesFlow)
}

export default storageWatcher;