import {SIGNUP_ERROR, SIGNUP_REQUESTING,SIGNUP_SUCCESS} from './constants'
const initialState = {

    requesting: false,
    successful: false,
    messages: [],
    errors: [],
}

const reducer = function signupReducer (state = initialState, action){
    switch(action.type){
        case SIGNUP_REQUESTING:
        return {
            requesting: true,
            successful: false,
            messages:[{body:"注册中，请稍后...",time: new Date()}],
            errors: [],
        }
        case SIGNUP_SUCCESS:{
            return {
                errors: [],
                messages: [{
                    body: `新用户注册成功`,
                    time: new Date()
                }],
                requesting: false,
                successful: true
            }
        }
        case SIGNUP_ERROR:
            return {
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date()
                }]),
                messages: [],
                requesting: false,
                successful: false,
            }
        default: 
        return state 
    }
}

export default reducer;