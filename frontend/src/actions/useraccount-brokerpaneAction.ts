export function changePane1(status: boolean) {
    return {
        type: 'CHANGE_PANE_1',
        payload: status
    };
}

export function changePane2(status: boolean) {
    return {
        type: 'CHANGE_PANE_2',
        payload: status
    };
}

export function changePane3(status: boolean) {
    return {
        type: 'CHANGE_PANE_3',
        payload: status
    };
}