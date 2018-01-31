interface ReducerState {
    token: string | null;
    isLoggedIn: boolean;
}

interface ReducerAction {
    type: string;
    payload: any;
}

const getInitState = () => {
    let token = localStorage.getItem('myToken');
    let isLoggedIn = (token != null);
    return ({
        token: token,
        isLoggedIn: isLoggedIn
    });
};

export default function reducer(state: ReducerState = getInitState(), action: ReducerAction) {
    switch (action.type) {
        case 'ADD_TOKEN':
            return { ...state, token: action.payload, isLoggedIn: true };

        case 'REMOVE_TOKEN':
            return { ...state, token: action.payload, isLoggedIn: false };

        default:
            return state;
    }
}