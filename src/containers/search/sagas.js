import { takeLatest, put, call } from 'redux-saga/effects';
import {
    getToken,
    request,

} from '../../lib'

import {
    SEARCH_FILES, SEARCH_FILES_SUCCESS
} from './constants';

import {
    FETCHING_SUCCESS, 
    FETCHING_FAIL, 
    FETCHING_START 
} from '../controller/constants'



const searchApiUrl = `${process.env.REACT_APP_DUDO_API}/api/search/files`

function searchFiles(filename) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return request(searchApiUrl, {
        crossDomain: true,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            search:filename,
        })
    })    
}




function* searchFilesFlow(action) {
    try {
        const { search,cb } = action
        yield put({type: FETCHING_START})
        const response = yield call(searchFiles, search)
        yield put({type: SEARCH_FILES_SUCCESS, response})
        yield put({type: FETCHING_SUCCESS})
        cb()
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}




function* storageWatcher() {
    yield takeLatest(SEARCH_FILES, searchFilesFlow)
}

export default storageWatcher;