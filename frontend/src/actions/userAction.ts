import axios from 'axios';

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

export function getUserSetting() {
    let token = localStorage.getItem('myToken');
    return {
        type: "GET_USER_SETTING",
        payload: axios.get('http://localhost:8080/api/user/', {
            headers: {'Authorization': "bearer " + token}
        })
    }
}

export function igTokenValidity(result: boolean) {
    return {
        type: "IG_TOKEN_VALIDITY",
        payload: result
    }
}

export function changeIGKey(key: string) {
    return {
        type: "CHANGE_IG_KEY",
        payload: key
    }
}

export function oandaTokenValidity(result: boolean) {
    return {
        type: "OANDA_TOKEN_VALIDITY",
        payload: result
    }
}

export function changeOnadaKey(key: string) {
    return {
        type: "CHANGE_OANDA_KEY",
        payload: key
    }
}