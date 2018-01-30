
export function addToken(token: string) {
    localStorage.setItem('myToken', token);
    return {
        type: 'ADD_TOKEN',
        payload: token
    };
}

export function removeToken() {
    localStorage.removeItem('myToken');
    return {
        type: 'REMOVE_TOKEN',
        payload: null
    };
}