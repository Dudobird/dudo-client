import { takeLatest, put, call } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import {
    getToken,
    request,
} from '../../lib'

import {
    FETCH_USERS, 
    FETCH_USERS_SUCCESS,
    DELETE_USER,
    DELETE_USER_SUCCESS,

    SETTING_USER_LIMIT,
    SETTING_SUCCESS,
    RESET_USER_PASSWORD,
} from './constants';

import {
    SHOW_VIEW_MODAL,
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


function deleteUser(id) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return request(`${adminUserApiUrl}/${id}`, {
        crossDomain: true,
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })    
}



function* deleteUserFlow(action){
    try {
        const { id } = action
        yield put({type: FETCHING_START})
        yield call(deleteUser, id)
        yield put({type: DELETE_USER_SUCCESS, id})
        NotificationManager.success('设置成功')
        yield put({type: SHOW_VIEW_MODAL,modal:""})
        yield put({type: FETCHING_SUCCESS})
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}


function settingUserStorageLimit(id,readableSize) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return request(`${adminUserApiUrl}/${id}/limit`, {
        crossDomain: true,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            readableSize,
        })
    })    
}


function* settingUserStorageLimitFlow(action){
    try {
        const { id,readableSize } = action
        yield put({type: FETCHING_START})
        yield call(settingUserStorageLimit, id,readableSize)
        yield put({type: SETTING_SUCCESS, id})
        NotificationManager.success('设置成功')
        yield put({type: SHOW_VIEW_MODAL,modal:""})
        yield put({type: FETCHING_SUCCESS})
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}

function resetUserPassword(id,password) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return request(`${adminUserApiUrl}/${id}/password`, {
        crossDomain: true,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            password,
        })
    })    
}


function* resetUserPasswordFlow(action){
    try {
        const { id,password } = action
        yield put({type: FETCHING_START})
        yield call(resetUserPassword, id,password)
        yield put({type: SETTING_SUCCESS, id})
        NotificationManager.success('设置成功')
        yield put({type: SHOW_VIEW_MODAL,modal:""})
        yield put({type: FETCHING_SUCCESS})
    } catch (error) {
        yield put({type: FETCHING_FAIL, error})
    }
}

function* adminWatcher() {
    yield takeLatest(FETCH_USERS, fetchUsersFlow)
    yield takeLatest(DELETE_USER, deleteUserFlow)
    yield takeLatest(SETTING_USER_LIMIT,settingUserStorageLimitFlow)
    yield takeLatest(RESET_USER_PASSWORD,resetUserPasswordFlow)
}

export default adminWatcher;