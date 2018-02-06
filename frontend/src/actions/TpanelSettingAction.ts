import axios from 'axios';

export function loadWatchList(panelNum: number) {
    let token = localStorage.getItem('myToken');
    return {
        type: "LOAD_WATCHLIST",
        payload: axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/user/panel',
                    data: {
                        panelnum: panelNum,
                        paneltype: 'watchlist'
                    },
                    headers: {
                        'Authorization': "bearer " + token,
                    },
                })
    }
}

export function loadChart(panelNum: number) {
    let token = localStorage.getItem('myToken');
    return {
        type: "LOAD_CHART",
        payload: axios({
            method: 'post',
            url: 'http://localhost:8080/api/user/panel',
            data: {
                panelnum: panelNum,
                paneltype: 'chart'
            },
            headers: {
                'Authorization': "bearer " + token,
            },
        })
    }
}

export function loadNews(panelNum: number) {
    let token = localStorage.getItem('myToken');
    return {
        type: "LOAD_NEWS",
        payload: axios({
            method: 'post',
            url: 'http://localhost:8080/api/user/panel',
            data: {
                panelnum: panelNum,
                paneltype: 'news'
            },
            headers: {
                'Authorization': "bearer " + token,
            },
        })
    }
}

export function closeComponent(panelNum: number) {
    let token = localStorage.getItem('myToken');
    return {
        type: "CLOSE_COMPONENTS",
        payload: axios({
            method: 'post',
            url: 'http://localhost:8080/api/user/panel',
            data: {
                panelnum: panelNum,
                paneltype: 'none'
            },
            headers: {
                'Authorization': "bearer " + token,
            },
        })
    }
}