interface ReducerState {
    leftShow: boolean;
    rightShow: boolean;
}

interface ReducerAction {
    type: string;
    payload: any;
}

const InitState = {
    leftShow: false,
    rightShow: false,
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

        default:
            return state;
    }
}