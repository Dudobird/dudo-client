import {
    LOGIN_ERROR,
    LOGIN_REQUESTING,
    LOGIN_SUCCESS
} from './constants'

const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: []
}


const reducer = function loginReducer(state = initialState, action){
    switch (action.type) {
        // Set the requesting flag and append a message to be shown
        case LOGIN_REQUESTING:
          return {
            requesting: true,
            successful: false,
            messages: [{ body: '正在登入，请稍后...', time: new Date() }],
            errors: [],
          }
    
        case LOGIN_SUCCESS:
          return {
            errors: [],
            messages: [],
            requesting: false,
            successful: true,
          }
    
        case LOGIN_ERROR:
          return {
            errors: state.errors.concat([{
              body: action.error.toString(),
              time: new Date(),
            }]),
            messages: [],
            requesting: false,
            successful: false,
          }
    
        default:
          return state
      }
    }
    
    export default reducer  