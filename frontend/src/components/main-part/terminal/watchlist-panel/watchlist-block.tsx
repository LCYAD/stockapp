import * as React from 'react';
import './watchlist-panel.css';
import { connect } from 'react-redux';
import { ActionInstruTrigger } from '../../../../actions/watchlistAction';
import { ActionFetchChartData, ActionFetchNews } from '../../../../actions/newsAction';

interface WatchListBlockProps {
    instru: any[];
    instruTrigger: any;
    fetchChartData: any;
    fetchNews: any;
}

interface WatchListBlockState { }

class WatchListBlock extends React.Component<WatchListBlockProps, WatchListBlockState> {

    constructor(props: WatchListBlockProps) {
        super(props);
    }

    buttonInstruTrigger = () => {
        this.props.fetchChartData(this.props.instru);
        console.log(this.props);
        this.props.fetchNews(this.props.instru);
    }

    render() {
        return (
            <div>
                <button onClick={this.buttonInstruTrigger}> {this.props.instru} </button>
                <p> &emsp; Ticker space </p>
            </div>
        );
    }
}

const mapStateToProps = (state: any, props: any) => {
    return {
        ...state
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        instruTrigger: (instru: string) => {
            dispatch(ActionInstruTrigger(instru));
        },
        fetchChartData: (instru: string) => {
            dispatch(ActionFetchChartData(instru));
        },
        fetchNews: (instru: string) => {
            dispatch(ActionFetchNews(instru));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListBlock);
