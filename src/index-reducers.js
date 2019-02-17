import {combineReducers} from 'redux'
import client from './client/reducer';
import signup from './signup/reducer';
import {reducer as form } from 'redux-form';

const IndexReducer = combineReducers({
    form,
    client,
    signup,
});


export default IndexReducer;