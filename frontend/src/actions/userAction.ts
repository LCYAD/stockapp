
export function addToken(token: string) {
    localStorage.setItem('myToken', token);
    return {
        type: 'ADD_TOKEN',
        payload: token
    };
}

export function addEmail(email: string) {
    localStorage.setItem('myEmail', email);
    return {
        type: 'ADD_EMAIL',
        payload: email
    };
}

export function addName(name: string) {
    localStorage.setItem('myName', name);
    return {
        type: 'ADD_NAME',
        payload: name
    };
}

export function removeToken() {
    localStorage.removeItem('myToken');
    return {
        type: 'REMOVE_TOKEN',
        payload: null
    };
}