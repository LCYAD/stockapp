import { combineReducers } from 'redux';

// export default (state: {}) => state;

import user from './user';
import notification from './notification';
import panelToggle from './panelToggle';
import newsReducer from './newsReducer';
import watchlistReducer from './watchlistReducer';

export default combineReducers({
    user,
    notification,
    panelToggle,
    newsReducer,
    watchlistReducer
});