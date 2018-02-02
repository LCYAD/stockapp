import { combineReducers } from 'redux';

// export default (state: {}) => state;

import user from './user';
import notification from './notification';
import panelToggle from './panelToggle';

export default combineReducers({
    user,
    notification,
    panelToggle
});