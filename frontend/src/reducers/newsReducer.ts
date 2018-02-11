import NewsType from '../newstype.model';
import { instruMatch } from '../components/main-part/community/community';

interface ReducerAction {
    instrument: string;
    type: string;
    payload: any;
}

interface ReducerState {
    newslist: NewsType[];
   // newsSearch: string;
}

export const initialState = {
    newslist: [
        // {title: "Google", url:"https://www.google.com", description: "exmaple"}
    ]
   // newsSearch: ""
}

export default function newsReducer (state: ReducerState = initialState, action: ReducerAction) {
    switch (action.type) {
        case "GET_NEWS_PENDING":
            return state;

        case "GET_NEWS_REJECTED":
            return state;

        case "GET_NEWS_FULFILLED":
            //console.log(state);
            var fetched : any[] = [];
            for (var i=0; i<action.payload.data.length; i++) {
                fetched.push({title: action.payload.data[i].headline, url: action.payload.data[i].url, description: action.payload.data[i].summary});
            }
           // var fetched = [{title: action.payload.data[0].headline, url: action.payload.data[0].url, description: action.payload.data[0].summary}];
            return {...state, newslist: [...fetched]};

        case "GET_INSTRU":
            console.log(action);
            return {...state, currentInstrument: action.payload, oandaInstrument: instruMatch[action.payload]};
        
        case "GET_CHART_PENDING":
            return state;

        case "GET_CHART_REJECTED":
            return state;

        case "GET_CHART_FULFILLED":
            console.log(action);
            return {...state, chartData: action};

        case "GET_POST_PENDING":
            return state;

        case "GET_POST_REJECTED":
            return state;

        case "GET_POST_FULFILLED":
             console.log(action);
            return {...state, post: action};    
    }
    return state;
}