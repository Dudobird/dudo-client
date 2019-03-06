import { take, fork, cancel, call ,put, cancelled } from 'redux-saga/effects'

import {handleApiErrors} from '../../lib/api-errors'
import history from '../history';

import {
    setClient,
} from '../client/actions'
import {logout} from '../logout/sagas'
import {
    CLIENT_UNSET
} from '../client/constants'

import { LOGIN_REQUESTING, LOGIN_ERROR, LOGIN_SUCCESS } from './constants';

const signinApiUrl = `${process.env.REACT_APP_DUDO_API}/api/auth/signin`

function loginApi(email,password){
    return fetch(signinApiUrl,{
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


function* loginFlow(email, password){
    let token 
    try{
        token = yield call(loginApi,email,password)
        yield put(setClient(token))
        yield put({type: LOGIN_SUCCESS})
        localStorage.setItem('token',JSON.stringify(token))
        history.push('/storage')

    }catch(error){
        yield put({type: LOGIN_ERROR, error})
    }finally{
        if(yield cancelled()){
            history.push('/login')
        }
    }
    return token
}



// 监听多个任务的执行
function* loginWatcher(){
    while(true){
        // 等待接收到登入的请求
        const { email, password } = yield take(LOGIN_REQUESTING)
        // 创建另外一个“独立”的处理流程去处理登入请求，返回后台执行的任务
        const task = yield fork(loginFlow, email, password)
        // 继续进入等待状态，如果接收到任何的错误或者退出登入则获取状态信息
        const action = yield take([CLIENT_UNSET, LOGIN_ERROR])
        // 如果是退出则取消之前的任务
        if (action === CLIENT_UNSET) yield cancel(task)
        // 如果不是错误信息，则执行退出任务
        yield call(logout)
        
    }
}
export default loginWatcher ;