
import {
    GET_USER_PROFILE_FAIL,
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    UPDATE_PROFILE_INFO_SUCCESS,
    UPDATE_PROFILE_INFO_FAIL,
    SET_DEFAULT_STATUS,
    UPDATE_USER_PASSWORD,
    UPDATE_PROFILE_INFO,
    UPDATE_USER_PASSWORD_FAIL,
    UPDATE_USER_PASSWORD_SUCCESS
} from './constants'

const initialState = {
    profile: {},
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
}

const reducer = function signupReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DEFAULT_STATUS:
            return {
                ...state,
                errors: [],
                messages: [],
                requesting: false,
                successful: false,
            }
        case UPDATE_PROFILE_INFO:
        case UPDATE_USER_PASSWORD:
        case GET_USER_PROFILE:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [],
                errors: [],
            }
        case GET_USER_PROFILE_SUCCESS: {
            let profile = null
            if (action.response && action.response.data) {
                profile = action.response.data
            }
            return {
                ...state,
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
                profile
            }
        }
        case UPDATE_USER_PASSWORD_SUCCESS:
        case UPDATE_PROFILE_INFO_SUCCESS: {
            let profile = null
            if (action.response && action.response.data) {
                profile = action.response.data
            }
            return {
                ...state,
                errors: [],
                messages: [{
                    body: `更新用户信息成功`,
                    time: new Date()
                }],
                requesting: false,
                successful: true,
                profile
            }
        }

        case UPDATE_USER_PASSWORD_FAIL:
        case UPDATE_PROFILE_INFO_FAIL:
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