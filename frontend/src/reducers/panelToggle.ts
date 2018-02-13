interface ReducerState {
    leftShow: boolean;
    rightShow: boolean;
    leftLoadType: string;
    leftLoadClass: string;
    centerDimmed: boolean;
    mainLoad: boolean;
    TAccountPane1: boolean;
    TAccountPane2: boolean;
    TPositionPane1: boolean;
    TPositionPane2: boolean;
}

interface ReducerAction {
    type: string;
    payload: any;
}

const InitState = {
    leftShow: false,
    rightShow: false,
    leftLoadType: 'account',
    leftLoadClass: 'main-leftsidebar1',
    centerDimmed: false,
    mainLoad: false,
    TAccountPane1: false,
    TAccountPane2: false,
    TPositionPane1: false,
    TPositionPane2: false,
};

export default function reducer(state: ReducerState = InitState, action: ReducerAction) {
    switch (action.type) {

        case 'HIDE_LEFT_PANEL':
            return {...state, leftShow: action.payload};
        
        case 'HIDE_RIGHT_PANEL':
            return {...state, rightShow: action.payload};

        case 'SHOW_LEFT_PANEL':
            return {...state, leftShow: action.payload};
        
        case 'SHOW_RIGHT_PANEL':
            return {...state, rightShow: action.payload};
        
        case 'LOAD_LEFT_PANEL_TYPE':
            return {...state, leftLoadType: action.payload};

        case 'LOAD_LEFT_PANEL_CLASS':
            return {...state, leftLoadClass: action.payload};
        
        case 'CHANGE_DIMMED':
            return {...state, centerDimmed: action.payload};

        case 'CHANGE_MAIN_LOAD':
            return {...state, mainLoad: action.payload};

        case 'CHANGE_TACCOUNTPANE1':
            return {...state, TAccountPane1: action.payload};
        
        case 'CHANGE_TACCOUNTPANE2':
            return {...state, TAccountPane2: action.payload};
        
        case 'CHANGE_TPOSITIONPANE1':
            return {...state, TPositionPane1: action.payload};

        case 'CHANGE_TPOSITIONPANE2':
            return {...state, TPositionPane2: action.payload};

        default:
            return state;
    }
}