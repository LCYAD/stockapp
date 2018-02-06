interface ReducerState {
    token: string | null;
    isLoggedIn: boolean;
    panelStatus: {
        1: string;
        2: string;
        3: string;
    }
}

interface ReducerAction {
    type: string;
    payload: any;
}

const getInitState = () => {
    let token = localStorage.getItem('myToken');
    let isLoggedIn = (token !== null);
    return ({
        token: token,
        isLoggedIn: isLoggedIn,
        panelStatus: {
            1: 'none',
            2: 'none',
            3: 'none'
        }
    });
};

export default function reducer(state: ReducerState = getInitState(), action: ReducerAction) {
    switch (action.type) {
        case 'ADD_TOKEN':
            return { ...state, token: action.payload, isLoggedIn: true };

        case 'REMOVE_TOKEN':
            return { ...state, token: action.payload, isLoggedIn: false };

        case 'GET_USER_SETTING_PENDING':
            return state;
        
        case 'GET_USER_SETTING_FULFILLED':
            // console.log(action.payload);
            return {...state, panelStatus:action.payload.data[0].panel_setting};
        
        case 'GET_USER_SETTING_REJECTED':
            console.log(action.payload);
            return state;

        case 'LOAD_WATCHLIST_PENDING':
            return state;
    
        case 'LOAD_WATCHLIST_FULFILLED':
            console.log(action.payload.data[0].panel_setting);
            return {...state, panelStatus: action.payload.data[0].panel_setting};
    
        case 'LOAD_WATCHLIST_REJECTED':
            console.log(action.payload);
            return state;

        case 'LOAD_NEWS_PENDING':
            return state;
    
        case 'LOAD_NEWS_FULFILLED':
            // console.log(action.payload);
            return {...state, panelStatus:action.payload.data[0].panel_setting};
    
        case 'LOAD_NEWS_REJECTED':
            console.log(action.payload);
            return state;

        case 'LOAD_CHART_PENDING':
            return state;
    
        case 'LOAD_CHART_FULFILLED':
            // console.log(action.payload);
            return {...state, panelStatus:action.payload.data[0].panel_setting};
    
        case 'LOAD_CHART_REJECTED':
            console.log(action.payload);
            return state;

        case 'CLOSE_COMPONENTS_PENDING':
            return state;
    
        case 'CLOSE_COMPONENTS_FULFILLED':
            // console.log(action.payload);
            return {...state, panelStatus:action.payload.data[0].panel_setting};
    
        case 'CLOSE_COMPONENTS_REJECTED':
            console.log(action.payload);
            return state;
        default:
            return state;
    }
}