import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import all33 from './all33';
export default combineReducers({
  alert,
  auth,
  profile,
  post,
  all33
});
