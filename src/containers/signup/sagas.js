import { takeLatest, put, call} from 'redux-saga/effects';
import { handleApiErrors } from '../../lib/api-errors'  
import { 
    SIGNUP_REQUESTING,
    SIGNUP_ERROR,
    SIGNUP_SUCCESS,
} from './constants';

const signupApiUrl = `${process.env.REACT_APP_DUDO_API}/api/auth/signup`

function signupApi(email,password){
    return fetch(signupApiUrl,{
            crossDomain:true,
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email,password})
        }
    ).then(response => response.json())
     .then(handleApiErrors)
     .then(json => json )
     .catch(error=>{throw error})
}

function* signupFlow(action){
    try {
        const { email, password } = action
        const response = yield call(signupApi, email, password)
        yield put({type: SIGNUP_SUCCESS, response})
    }catch(error){
        yield put({type: SIGNUP_ERROR, error})
    }
}

function* signupWatcher(){
    yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher;