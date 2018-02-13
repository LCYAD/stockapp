import axios from 'axios';

// export function followUser(key: string) {
//     return {
//         type: 'FOLLOW_USER',
//         payload: key
//     };
// }

export function ActionGetFollowing(key: any) {
    return {
        type: "GET_FOLLOWING",
        payload: axios.post("http://localhost:8080/api/getfollowing", key)
    };
}

export function addToken(token: string) {
    localStorage.setItem('myToken', token);
    return {
        type: 'ADD_TOKEN',
        payload: token
    };
}

export function addFollowing(following: string) {
    localStorage.setItem('myFollowing', following);
    return {
        type: 'ADD_LOADFOLLOWING',
        payload: following
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

export function getUserSetting() {
    let token = localStorage.getItem('myToken');
    return {
        type: "GET_USER_SETTING",
        payload: axios.get('http://localhost:8080/api/user/', {
            headers: {'Authorization': "bearer " + token}
        })
    }
}

export function updateUserSetting(input: Object) {
    return {
        type: "UPDATE_USER_SETTING",
        payload: input
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