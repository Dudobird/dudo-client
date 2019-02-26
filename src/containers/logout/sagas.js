
import { put,takeLatest} from 'redux-saga/effects'
import history from '../history';
import {
    LOGOUT_SUCCESS,
    LOGOUT_REQUESTING,
    LOGOUT_FAIL,
} from './constants'

import {
    unsetClient
} from '../client/actions'

export function* logout(){
    yield put(unsetClient())
    localStorage.removeItem('token')
    history.push('/login')
}


function* logoutFlow(){
    try{
        yield put(unsetClient())
        yield put({type: LOGOUT_SUCCESS})
        localStorage.removeItem('token')
        history.push('/login')
    }catch(error){
        yield put({type: LOGOUT_FAIL, error})
    }
}

function* logoutWatcher(){
    yield takeLatest(LOGOUT_REQUESTING, logoutFlow)
}


export default logoutWatcher