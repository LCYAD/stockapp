interface ReducerState {
    type: string;
    title?: string;
    message?:string;
}

interface ReducerAction {
    type: string;
    payload: any;
}

const InitState = {
    type: "hide",
    message: "",
    title: ""
};

export default function reducer(state: ReducerState = InitState, action: ReducerAction) {
    switch (action.type) {

        case "SUCCESS_MSG":
            return {...state, type: action.payload.type, title: action.payload.title, message: action.payload.message};

        case "FAIL_MSG":
            return {...state, type: action.payload.type, title: action.payload.title, message: action.payload.message};

        case "HIDE_MSG":
            return {...state, type: action.payload.type, title: action.payload.title, message: action.payload.message};
            
        default:
            return state;
    }
}