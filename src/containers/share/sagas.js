import { takeLatest, put, call } from 'redux-saga/effects';
import {
    getToken,
    request,

} from '../../lib'
import { 
    GET_SHARE_FILES,
    GET_SHARE_FILES_SUCCESS,
    GET_SHARE_FILES_FAIL,
    DELETE_SHARE_FILE,
    DELETE_SHARE_FILE_SUCCESS,
} from './constants';

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
        const response = yield call(getShareFiles)
        yield put({ type: GET_SHARE_FILES_SUCCESS, response })
    } catch (error) {
        yield put({ type: GET_SHARE_FILES_FAIL, error })
    }
}

function* deleteShareFilesFlow(action){
    try {
        const { id } = action
        const response = yield call(deleteShareFileAPI,id)
        yield put({ type: DELETE_SHARE_FILE_SUCCESS, id,response })
    } catch (error) {
        yield put({ type: GET_SHARE_FILES_FAIL, error })
    }
}

function* storageWatcher() {
    yield takeLatest(GET_SHARE_FILES, getShareFilesFlow)
    yield takeLatest(DELETE_SHARE_FILE, deleteShareFilesFlow)
}

export default storageWatcher;