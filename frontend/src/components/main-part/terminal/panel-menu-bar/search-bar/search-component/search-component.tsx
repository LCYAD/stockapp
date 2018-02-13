import * as _ from 'lodash';
import * as React from 'react';

import { Search } from 'semantic-ui-react';

import { getSource } from './oanda-source';

interface SearchComponentProps {
    searchbarChange: Function;
}

interface SearchComponentState {
    isLoading: boolean;
    results: Object[];
    value: string;
}

const source = getSource();

class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState> {

    constructor(props: any) {
        super(props);
        this.resetComponent = this.resetComponent.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentWillMount() {
        this.resetComponent();
    }

    resetComponent() {
        this.setState({
            isLoading: false,
            results: [],
            value: ''
        });
    }

    handleResultSelect(e: any, { result }: any) {
        this.setState({ value: result.title });
        this.props.searchbarChange(result.title);
    }

    handleSearchChange(e: any, { value }: any) {

        this.props.searchbarChange(value);

        this.setState({
            isLoading: true,
            value
        });

        setTimeout(() => {
            if (this.state.value.length < 1)
                return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result: any) => re.test(result.title);
            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            });
        }, 500);
    }

    render() {
        const { isLoading, value, results } = this.state;
        return (
            <Search
                className="search-bar"
                size="mini"
                fluid={true}
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                {...this.props}
            />
        )
    }
}

export default SearchComponent;