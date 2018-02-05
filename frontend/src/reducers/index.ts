import { combineReducers } from 'redux';

// export default (state: {}) => state;

import user from './user';
import notification from './notification';
import panelToggle from './panelToggle';
import TpanelSetting from './TpanelSetting';

export default combineReducers({
    user,
    notification,
    panelToggle,
    TpanelSetting
});