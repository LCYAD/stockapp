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