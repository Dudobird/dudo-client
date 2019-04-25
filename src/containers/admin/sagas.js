import { takeLatest, put, call } from 'redux-saga/effects';
import {
    getToken,
    request,
} from '../../lib'

import {
    FETCH_USERS, 
    FETCH_USERS_SUCCESS
} from './constants';

import {
    FETCHING_SUCCESS, 
    FETCHING_FAIL, 
    FETCHING_START 
} from '../controller/constants'



const adminUserApiUrl = `${process.env.REACT_APP_DUDO_API}/api/admin/users`

function fetchUsers(page, size, search) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    const url = `${adminUserApiUrl}?page=${page}&size=${size}&q=${search}`
    return request(url, {
        crossDomain: true,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })    
}




function* fetchUsersFlow(action) {
    try {
        const { page,size,search } = action
        yield put({type: FETCHING_START})
        const response = yield call(fetchUsers, page,size,search)
        yield put({type: FETCH_USERS_SUCCESS, response})
        yield put({type: FETCHING_SUCCESS})
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}




function* adminWatcher() {
    yield takeLatest(FETCH_USERS, fetchUsersFlow)
}

export default adminWatcher;