interface ReducerState {
    panelStatus: {
        1: string;
        2: string;
        3: string;
    };
}

interface ReducerAction {
    type: string;
    payload: any;
}

const InitState = {
    panelStatus: {
        1: 'none',
        2: 'none',
        3: 'none',
    }
};

export default function reducer(state: ReducerState = InitState, action: ReducerAction) {
    switch (action.type) {

        default:
            return state;
    }
}