
import {
    GET_USER_PROFILE_FAIL,
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS
} from './constants'

const initialState = {
    profile: null,
    requesting: false,
    successful: false,
    message: [],
    error: [],
}

const reducer = function signupReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [],
                errors: [],
            }
        case GET_USER_PROFILE_SUCCESS: {
            return {
                ...state,
                errors: [],
                messages: [{
                    body: "用户信息获取成功",
                    time: new Date()
                }],
                requesting: false,
                successful: true,
                profile: action.profile
            }
        }
        case GET_USER_PROFILE_FAIL:
            return {
                ...state,
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