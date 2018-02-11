//import { instruMatch } from '../components/main-part/community/community';

interface ReducerAction {
    watchlistInstru: any;
    type: any;
    payload: any;
}

interface ReducerState {
    watchlistInstru: any;
   // newsSearch: string;
}

export const initialState = {
    watchlistInstru: []
}

export default function watchlistReducer (state: ReducerState = initialState, action: ReducerAction) {
    switch (action.type) {
        // case "GET_NEWS_FULFILLED":
        //     //console.log(state);
        //     var fetched : any[] = [];
        //     for (var i=0; i<action.payload.data.length; i++) {
        //         fetched.push({title: action.payload.data[i].headline, url: action.payload.data[i].url, description: action.payload.data[i].summary});
        //     }
        //    // var fetched = [{title: action.payload.data[0].headline, url: action.payload.data[0].url, description: action.payload.data[0].summary}];
        //     return {newslist: [...fetched]};
        
        case "SELECT_INSTRU":
            console.log(action);
            return {...state, watchlistInstru: action.payload/*, oandaInstrument: instruMatch[action.payload]*/};

        case "TRIGGER_INSTRU":
            console.log(action);
            
            return {...state, instruTriggered: action.payload};    
    }
    return state;
}