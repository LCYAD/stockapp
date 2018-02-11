import axios from 'axios';
import { getData } from '../components/main-part/terminal/chart-panel/utils';
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
        payload: getData(instruMatch[key], "S30"/*"EUR_USD"*/),
        meta: {instru: instruMatch[key], change: true}
    };
}

export function ActionFetchChartDataGran(key: string, gran: string) {
    return {
        type: "GET_CHART",
        payload: getData(key, gran/*"EUR_USD"*/),
        meta: {instru: key, gran: gran, change: true}
    };
}

export function ActionFetchPost(key: any) {
    return {
        type: "GET_POST",
        payload: axios.post("http://localhost:8080/api/getpost", key)
    };
}