import * as React from 'react';
import './watchlist-content.css';

import { connect } from 'react-redux';

import axios from 'axios';

import * as io from 'socket.io-client';

// import actions
import { updateWatchList } from '../../../../../actions/watchlistAction';

// import Components
import InstruBlock from './instru-block/instru-block';

interface WatchListContentProps {
    watchlist: {
        name: string;
        instru: string[];
    }
    updateWatchList: Function;
    token: string;
}

interface WatchListContentState { 
    watchlist_data: {
        instrument: string;
        ask: string;
        bid: string;
        askstatus: string;
        bidStatus: string;
    }[]
}

class WatchListContent extends React.Component<WatchListContentProps, WatchListContentState> {

    constructor(props: any) {
        super(props);
        this.loadWatchListComponent = this.loadWatchListComponent.bind(this);
        this.handleRemoveInstru = this.handleRemoveInstru.bind(this);
        this.InitWatchListData = this.InitWatchListData.bind(this);
        this.updateWatchListData = this.updateWatchListData.bind(this);
    }


    componentWillMount(){
        
        this.setState({watchlist_data: []});
        this.InitWatchListData();
        
        const socket = io.connect('http://localhost:8080');
        socket.on('ticks', (data:any)=>{
            // let new_data = JSON.parse(data);
            // console.log(new_data);
        })
    }
    
    InitWatchListData(){
        let new_watchlist_data = [];
        for (let index=0; index < this.props.watchlist.instru.length; index++){
            new_watchlist_data.push({
                instrument: this.props.watchlist.instru[index],
                ask: '--',
                bid: '--',
                askstatus: "none",
                bidStatus: "none",
            });
        }
        this.setState({watchlist_data: new_watchlist_data}, ()=>{
            // console.log(this.state.watchlist_data);
        });
    }

    updateWatchListData(nextprops: any) {
        let new_watchlist_data = [];
        for (let index=0; index < nextprops.watchlist.instru.length; index++){
            new_watchlist_data.push({
                instrument: nextprops.watchlist.instru[index],
                ask: '--',
                bid: '--',
                askstatus: "none",
                bidStatus: "none",
            });
        }
        this.setState({watchlist_data: new_watchlist_data}, ()=>{
            // console.log(this.state.watchlist_data);
        });
    }

    componentWillReceiveProps(nextprops: any) {
        this.updateWatchListData(nextprops);
    }

    loadWatchListComponent() {
        return this.state.watchlist_data.map((data, index)=>{
            return(
                <div>
                    <InstruBlock
                        data={data}
                        index={index}
                        removeInstru={this.handleRemoveInstru}
                    />
                </div>
            );
        })
    }

    handleRemoveInstru(index: number){
        // console.log('Removing index', index);
        
        let new_watchlist = {
            name: this.props.watchlist.name,
            instru: [...this.props.watchlist.instru.splice(0, index), ...this.props.watchlist.instru.splice(index+1)]
        }
        this.props.updateWatchList(new_watchlist, this.props.token);
    }

    render() {
        return (
            <div className="watchlist-content-box">
               {this.loadWatchListComponent()}
            </div>
        );
    }
}

const mapStateToProps = (state: any, props: any) => {
    return {
        watchlist: state.user.watchlist,
        token: state.user.token,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateWatchList: (watchlist: string, token: string) => {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/user/watchlist',                
                headers: {
                    'Authorization': "bearer " + token,
                    'Content-Type': 'application/json'
                },
                data: {
                    watchlist: JSON.stringify(watchlist)
                },
            }).then((res) => {
                console.log(res.data[0]);
                dispatch(updateWatchList(res.data[0].watchlist));
            }).catch((err)=> {
                console.log(err);
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListContent);