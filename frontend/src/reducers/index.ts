import { combineReducers } from 'redux';

// export default (state: {}) => state;

import user from './user';
import newsReducer from './newsReducer';

export default combineReducers({
    user, newsReducer
});