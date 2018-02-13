import * as React from 'react';
import './search-bar.css';
import axios from 'axios';

import { Button, Icon } from 'semantic-ui-react';

import { connect } from 'react-redux';

// import actions
import { updateWatchList } from '../../../../../actions/watchlistAction';

// import components
import SearchComponent from './search-component/search-component';

interface SearchBarProps {
    updateWatchList: Function;
    token: string;
    watchlist: {
        name: string;
        instru: string[];
    };
}

interface SearchBarState { 
    searchKey: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {

    constructor(props: any) {
        super(props);
        this.handleAddInstrument = this.handleAddInstrument.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    }

    componentWillMount() {
        this.setState({searchKey: ""});
    }

    handleAddInstrument() {
        // add this.state.searchKey to the watchlist database
        let new_watchlist = {
            name: this.props.watchlist.name, 
            instru: [...this.props.watchlist.instru, this.state.searchKey]
        };
        this.props.updateWatchList(new_watchlist, this.props.token);
    }

    handleSearchBarChange(searchKey: string) {
        this.setState({searchKey: searchKey});
        // console.log('new Search Key', searchKey);
    }

    render() {
        return (
            <div className="search-bar-box">
                <SearchComponent 
                    searchbarChange={this.handleSearchBarChange}
                />
                <Button
                    compact={true}
                    className="add-instru-btn"
                    onClick={this.handleAddInstrument}
                >
                    <Button.Content>
                        <Icon 
                            name="add circle"
                        />
                    </Button.Content>
                </Button>
            </div>
        );
    }
} // End SearchBar Class

const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props,
        token: state.user.token,
        watchlist: state.user.watchlist,
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

export default connect(mapStatetoProps, mapDispatchToProps)(SearchBar);