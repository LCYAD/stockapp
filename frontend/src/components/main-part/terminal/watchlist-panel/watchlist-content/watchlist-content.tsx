import * as React from 'react';
import './watchlist-content.css';

import { connect } from 'react-redux';

import { Table, Icon } from 'semantic-ui-react';

import axios from 'axios';

import * as io from 'socket.io-client';

// import actions
import { updateWatchList } from '../../../../../actions/watchlistAction';

// import Components
// import InstruBlock from './instru-block/instru-block';s

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
        askStatus: string;
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
        this.updateWatchListDataIO = this.updateWatchListDataIO.bind(this);
    }

    componentWillMount(){
        
        this.setState({watchlist_data: []});
        this.InitWatchListData();
        
        const socket = io.connect('http://localhost:8080');
        socket.on('ticks', (data:any)=>{
            let new_data = JSON.parse(data);
            if (new_data.type !== "HEARTBEAT"){
                this.updateWatchListDataIO(new_data);
            }
        })
    }

    updateWatchListDataIO(new_data: any){
        // console.log(new_data);
        let new_watchlist_data = [];
        for (let index = 0 ; index < this.state.watchlist_data.length; index++) {
            if (this.state.watchlist_data[index].instrument === new_data.instrument){
                let askStatus, bidStatus;
                if (Number(new_data.asks[0].price) > Number(this.state.watchlist_data[index].ask)) {
                    askStatus = "up";
                } else if (Number(new_data.asks[0].price) < Number(this.state.watchlist_data[index].ask)) {
                    askStatus = "down";
                } else {
                    askStatus = "none";
                }

                if (Number(new_data.bids[0].price) > Number(this.state.watchlist_data[index].bid)) {
                    bidStatus = "up";
                } else if (Number(new_data.bids[0].price) < Number(this.state.watchlist_data[index].bid)) {
                    bidStatus = "down";
                } else {
                    bidStatus = "none";
                }

                new_watchlist_data.push({
                    instrument: new_data.instrument,
                    ask: new_data.asks[0].price,
                    bid: new_data.bids[0].price,
                    askStatus: askStatus,
                    bidStatus: bidStatus,
                })
            } else {
                new_watchlist_data.push(this.state.watchlist_data[index]);
            }
        }
        this.setState({watchlist_data: new_watchlist_data}, ()=>{
            // console.log(this.state.watchlist_data);
        });
    }
    
    InitWatchListData(){
        let new_watchlist_data = [];
        for (let index=0; index < this.props.watchlist.instru.length; index++){
            new_watchlist_data.push({
                instrument: this.props.watchlist.instru[index],
                ask: '--',
                bid: '--',
                askStatus: "none",
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
                askStatus: "none",
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
                <Table.Row key={index}>
                    <Table.Cell className="open-position-cell">{data.instrument}</Table.Cell>
                    <Table.Cell className="open-position-cell">
                        <span>{data.ask}</span>
                        {(data.askStatus==='up')?<span className="up-arrow"><Icon name="caret up"/></span>:<span/>}
                        {(data.askStatus==='down')?<span className="down-arrow"><Icon name="caret down"/></span>:<span/>}
                    </Table.Cell>
                    <Table.Cell className="open-position-cell">
                        {data.bid}
                        {(data.bidStatus==='up')?<span className="up-arrow"><Icon name="caret up"/></span>:<span/>}
                        {(data.bidStatus==='down')?<span className="down-arrow"><Icon name="caret down"/></span>:<span/>}
                    </Table.Cell>
                    <Table.Cell
                        textAlign="center"
                    >
                        <button 
                            className="close-position-btn" 
                            onClick={() => this.handleRemoveInstru(index)}
                        >
                            <Icon name="close"/>
                        </button>
                    </Table.Cell>
                </Table.Row>
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
                <Table 
                    celled={true}
                    selectable={true}
                    size="small"
                    compact={true}
                >
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Instrument</Table.HeaderCell>
                        <Table.HeaderCell>Bid</Table.HeaderCell>
                        <Table.HeaderCell>Ask</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.loadWatchListComponent()}
                    </Table.Body>
                </Table>

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