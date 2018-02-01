export function successMsg(title: string, message: string) {
    return {
        type: 'SUCCESS_MSG',
        payload: {
            title: title,
            message: message
        }
    };
}

export function failMsg(title: string, message: string) {
    return {
        type: 'FAIL_MSG',
        payload: {
            title: title,
            message: message
        }
    };
}

export function hideMsg() {
    return {
        type: 'HIDE_MSG',
        payload: {
            title: '',
            message: ''
        }
    };
}