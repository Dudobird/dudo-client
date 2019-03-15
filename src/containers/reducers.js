import { combineReducers } from 'redux'
import client from './client/reducer';
import signup from './signup/reducer';
import login from './login/reducer';
import storage from './storage/reducer';
import profile from './profile/reducer';
import shares from './share/reducer';
import { reducer as form } from 'redux-form';

const IndexReducer = combineReducers({
    form,
    client,
    signup,
    login,
    storage,
    profile,
    shares,
});


export default IndexReducer;