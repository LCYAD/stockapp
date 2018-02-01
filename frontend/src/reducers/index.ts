import { combineReducers } from 'redux';

// export default (state: {}) => state;

import user from './user';
import notification from './notification';

export default combineReducers({
    user,
    notification
});