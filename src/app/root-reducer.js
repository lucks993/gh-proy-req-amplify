import { combineReducers } from 'redux';
import authReducer from '../authentication/auth-reducer'

export default combineReducers({

auth:authReducer

});