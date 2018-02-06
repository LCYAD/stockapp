import axios from 'axios';
import { getData } from '../components/chart/utils';
import { instruMatch } from '../components/main-part/community/community';

export function ActionFetchNews(key: string) {
    return {
        type: "GET_NEWS",
        payload: axios.get("https://api.iextrading.com/1.0/stock/"+key+"/news"),
    };
}

export function ActionSelectInstrument(key: string) {
    return {
        type: "GET_INSTRU",
        payload: key,
    };
}

export function ActionFetchChartData(key: string) {
    return {
        type: "GET_CHART",
        payload: getData(instruMatch[key]/*"EUR_USD"*/),
    };
}

export function ActionFetchPost(key: any) {
    return {
        type: "GET_POST",
        payload: axios.post("http://localhost:8080/api/getpost", key)
    };
}