import * as React from 'react';
import './load-util.css';

import { connect } from 'react-redux';

import NewsPanel from '../news-panel/news-panel';
import OptionPanel from '../option-panel/option-panel';
import WatchListPanel from '../watchlist-panel/watchlist-panel';
import ChartPanel from '../chart-panel/chart-panel';

interface LoadUtilProps {
    panel: string;
    panelStatus: {
        1: string;
        2: string;
        3: string;
    };
}

interface LoadUtilState { }

class LoadUtil extends React.Component<LoadUtilProps, LoadUtilState> {

    constructor(props: LoadUtilProps) {
        super(props);
        this.loadFunction = this.loadFunction.bind(this);
    }

    loadFunction() {
        if (this.props.panelStatus[this.props.panel] === 'news') {
            return (
                <NewsPanel panel={this.props.panel}/>
            );
        } else if (this.props.panelStatus[this.props.panel] === 'watchlist') {
            return (
                <WatchListPanel panel={this.props.panel}/>
            );
        } else if (this.props.panelStatus[this.props.panel] === 'chart') {
            return (
                <ChartPanel panel={this.props.panel}/>
            );
        } else {
            return (
                <OptionPanel panel={this.props.panel}/>
            );
        }
    }

    render() {
        return (
            <div id="load-util-container">
                {this.loadFunction()}
            </div>
        );
    }
} // End LoadUtil Class

const mapStateToProps = (state: any, props: any) => {
    return {
        ...props,
        panelStatus: state.user.panelStatus
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadUtil);