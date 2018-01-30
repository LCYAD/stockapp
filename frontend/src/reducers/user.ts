interface ReducerState {
    token: string | null;
}

interface ReducerAction {
    type: string;
    payload: any;
}

const getInitState = () => {
    return ({
        token: localStorage.getItem('myToken')
    });
};

export default function reducer(state: ReducerState = getInitState(), action: ReducerAction) {
    switch (action.type) {
        case 'ADD_TOKEN':
            return { ...state, token: action.payload };

        case 'REMOVE_TOKEN':
            return { ...state, token: action.payload };

        default:
            return state;
    }
}