interface ReducerState {
    panelLoading1: boolean;
    panelLoading2: boolean;
    panelLoading3: boolean;
}

interface ReducerAction {
    type: string;
    payload: any;
}

const InitState = {
    panelLoading1: false,
    panelLoading2: false,
    panelLoading3: false,
};

export default function reducer(state: ReducerState = InitState, action: ReducerAction) {
    switch (action.type) {

        case "CHANGE_PANE_1":
            return {...state, panelLoading1: action.payload};

        case "CHANGE_PANE_2":
            return {...state, panelLoading2: action.payload};

        case "CHANGE_PANE_3":
            return {...state, panelLoading3: action.payload};

        default:
            return state;
    }
}