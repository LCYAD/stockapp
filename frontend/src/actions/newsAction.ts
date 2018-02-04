import axios from 'axios';
import { getData } from '../components/chart/utils';
import { instruMatch } from '../components/main-part/main-part';

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