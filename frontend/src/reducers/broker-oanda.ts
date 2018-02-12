interface ReducerState {
    accountsID: string[];
}

interface ReducerAction {
    type: string;
    payload: any;
}

const InitState = {
    accountsID: []
};

export default function reducer(state: ReducerState = InitState, action: ReducerAction) {
    switch (action.type) {

        case 'GET_ACCOUNTS':
            let account_list = [];
            for (let index=action.payload.length-1; index >= 0 ; index--) {
                account_list.push(action.payload[index].id);
            }
            return {...state, accountsID: [...account_list]};

        default:
            return state;
    }
}