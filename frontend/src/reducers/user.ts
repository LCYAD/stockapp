interface ReducerState {
    token: string | null;
    isLoggedIn: boolean;
    panelStatus: {
        1: string;
        2: string;
        3: string;
    };
    watchlist: {
        name: string;
        instru: string[];
    };
    user_setting: {
        currency: string;
        balance: string;
        leverage: string;
        beta_low: string;
        beta_high: string;
    }
    igtoken: string;
    igvalid: boolean;
    oandatoken: string;
    oandavalid: boolean;
    viewCurrentWatchList: string;
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
        email: localStorage.getItem('myEmail'),
        username: localStorage.getItem('myName'),
        panelStatus: {
            1: 'none',
            2: 'none',
            3: 'none'
        },
        watchlist: {
            name:'', 
            instru: []
        },
        user_setting: {
            currency: '',
            balance: '',
            leverage: '',
            beta_low: '',
            beta_high: ''
        },
        igtoken: '',
        igvalid: false,
        oandatoken: '',
        oandavalid: false,
        viewCurrentWatchList: ''
    });
};

export default function reducer(state: ReducerState = getInitState(), action: ReducerAction) {
    switch (action.type) {

        case 'GET_FOLLOWING_PENDING':
            return {...state};

        case 'GET_FOLLOWING_REJECTED':
            return {...state};

        case 'GET_FOLLOWING_FULFILLED':
        console.log(action.payload)
            return {...state, following: action.payload };

        case 'ADD_FOLLOWING_PENDING':
            return {...state};

        case 'ADD_FOLLOWING_REJECTED':
            return {...state};

        case 'ADD_FOLLOWING_FULFILLED':
            return {...state, following: action.payload };

        case 'ADD_TOKEN':
            return { ...state, token: action.payload, isLoggedIn: true };

        case 'ADD_EMAIL':
            return { ...state, email: action.payload };

        case 'ADD_LOADFOLLOWING':
            return { ...state, following: action.payload };    

        case 'ADD_NAME':
        console.log(action)
            return { ...state, name: action.payload };

        case 'REMOVE_TOKEN':
            return { ...state, token: action.payload, isLoggedIn: false };

        case 'GET_USER_SETTING_PENDING':
            return state;
        
        case 'GET_USER_SETTING_FULFILLED':
             console.log(action.payload);
            return  {   ...state, 
                        panelStatus:action.payload.data[0].panel_setting,
                        user_setting: action.payload.data[0].user_setting,
                        watchlist: action.payload.data[0].watchlist,
                        igtoken: action.payload.data[0].igtoken,
                        oandatoken: action.payload.data[0].oandatoken,
                        email: action.payload.data[0].email,
                        viewCurrentWatchList: action.payload.data[0].watchlist.name,
                    };
        
        case 'GET_USER_SETTING_REJECTED':
            return state;

        case 'UPDATE_USER_SETTING':
            return {...state, user_setting: action.payload}

        case 'LOAD_WATCHLIST_PENDING':
            return state;
    
        case 'LOAD_WATCHLIST_FULFILLED':
            return {...state, panelStatus: action.payload.data[0].panel_setting};
    
        case 'LOAD_WATCHLIST_REJECTED':
            return state;

        case 'LOAD_NEWS_PENDING':
            return state;
    
        case 'LOAD_NEWS_FULFILLED':
            // console.log(action.payload);
            return {...state, panelStatus:action.payload.data[0].panel_setting};
    
        case 'LOAD_NEWS_REJECTED':
            return state;

        case 'LOAD_CHART_PENDING':
            return state;
    
        case 'LOAD_CHART_FULFILLED':
            return {...state, panelStatus:action.payload.data[0].panel_setting};
    
        case 'LOAD_CHART_REJECTED':
            console.log(action.payload);
            return state;

        case 'CLOSE_COMPONENTS_PENDING':
            return state;
    
        case 'CLOSE_COMPONENTS_FULFILLED':
            return {...state, panelStatus:action.payload.data[0].panel_setting};
    
        case 'CLOSE_COMPONENTS_REJECTED':
            console.log(action.payload);
            return state;
        
        case 'IG_TOKEN_VALIDITY':
            return {...state, igvalid: action.payload};

        case 'CHANGE_IG_KEY':
            return {...state, igtoken: action.payload};
        
        case 'OANDA_TOKEN_VALIDITY':
            return {...state, oandavalid: action.payload};

        case 'CHANGE_OANDA_KEY':
            return {...state, oandatoken: action.payload};

        case 'UPDATE_WATCHLIST':
            return {...state, watchlist: action.payload};

        default:
            return state;
    }
}