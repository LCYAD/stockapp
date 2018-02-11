interface ReducerState {
    leftShow: boolean;
    rightShow: boolean;
    leftLoadType: string;
    leftLoadClass: string;
    centerDimmed: boolean;
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

        default:
            return state;
    }
}