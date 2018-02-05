import * as React from 'react';
import {connect} from 'react-redux';
//import { fetchNews } from '../actions/newsAction';

interface ListsProps {
  newsKey: '';
  fetchNews: Function;
}

interface ListsState {
  newsKey: '';
}

class Lists extends React.Component<ListsProps, ListsState> {
    constructor(props: ListsProps) {
      super(props);
    }

    /*
    getInitialState() {
      return {
          newsKey: 'AAPL'
      }
    }
*/

    /*
    changeSelected(event: { target: { value: any; }; }) {
      //this.setState({newsKey: event.target.value});
      fetchNews();
    }
    */

    render() {
      return (
        <div>
            <select id="select_news" onChange={(e) => this.props.fetchNews(e)}>
              <option value="AAPL">Apple</option>
              <option value="AMZN">Amazon</option>
              <option value="BABA">Alibaba</option>
              <option value="IBM">IBM</option>
              <option value="TSLA">Tesla</option>
              <option value="SNE">Sony</option>
              <option value="JYN">JPY/USD</option>
              <option value="GBB">GBP/USD</option>
              <option value="ERO">EUR/USD</option>
            </select>
        </div>
      );
    }
}

const ConnectedLists = connect((state: ListsState) => ({
  newsKey: state.newsKey,
}))(Lists);

export default ConnectedLists;