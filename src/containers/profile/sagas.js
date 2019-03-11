import { takeLatest, put, call } from 'redux-saga/effects';
import {
    getToken,
    request,
} from '../../lib'
import {
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    UPDATE_PROFILE_INFO,
    UPDATE_PROFILE_INFO_SUCCESS,
    UPDATE_PROFILE_INFO_FAIL,
    UPDATE_USER_PASSWORD,
    UPDATE_USER_PASSWORD_SUCCESS,
    UPDATE_USER_PASSWORD_FAIL
} from './constants';

const userProfileApiUrl = `${process.env.REACT_APP_DUDO_API}/api/profile`
const userPasswordApiUrl =  `${process.env.REACT_APP_DUDO_API}/api/auth/password`

function getUserProfile() {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return request(userProfileApiUrl, {
        crossDomain: true,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}


function* getUserProfileFlow() {
    try {
        const response = yield call(getUserProfile)
        yield put({ type: GET_USER_PROFILE_SUCCESS, response })
    } catch (error) {
        yield put({ type: GET_USER_PROFILE_FAIL, error })
    }
}

function updateProfileInfo(profile) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return request(userProfileApiUrl, {
        crossDomain: true,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(profile)
    })
}


function* updateProfileInfoFlow({ profile }) {
    try {
        const response = yield call(updateProfileInfo,profile)
        yield put({ type: UPDATE_PROFILE_INFO_SUCCESS, response })
    } catch (error) {
        yield put({ type: UPDATE_PROFILE_INFO_FAIL, error })
    }
}


function updateUserPassword(data) {
    const tokenRaw = localStorage.getItem("token");
    const token = getToken(tokenRaw);
    return request(userPasswordApiUrl, {
        crossDomain: true,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(data)
    })
}


function* updateUserPasswordFlow({ data }) {
    try {
        const response = yield call(updateUserPassword,data)
        yield put({ type: UPDATE_USER_PASSWORD_SUCCESS, response })
    } catch (error) {
        yield put({ type: UPDATE_USER_PASSWORD_FAIL, error })
    }
}

function* profileWatcher() {
    yield takeLatest(GET_USER_PROFILE, getUserProfileFlow)
    yield takeLatest(UPDATE_PROFILE_INFO,updateProfileInfoFlow)
    yield takeLatest(UPDATE_USER_PASSWORD,updateUserPasswordFlow)
}

export default profileWatcher;