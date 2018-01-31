import axios from 'axios';

export function ActionFetchNews(key: string) {
    return {
        type: "GET_NEWS",
        payload: axios.get("https://api.iextrading.com/1.0/stock/"+key+"/news")
    };
}
