import { takeLatest, put, call } from 'redux-saga/effects';
import {
    getToken,
    request,
} from '../../lib'
import {
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL
} from './constants';

const userProfileApiUrl = `${process.env.REACT_APP_DUDO_API}/api/profile`

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

function* profileWatcher() {
    yield takeLatest(GET_USER_PROFILE, getUserProfileFlow)
}

export default profileWatcher;