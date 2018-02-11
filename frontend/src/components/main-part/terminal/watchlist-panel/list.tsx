import * as React from 'react';
import {connect} from 'react-redux';
import { Dropdown } from 'semantic-ui-react'
//import { fetchNews } from '../actions/newsAction';

interface ListsProps {
  currentInstrument: '';
  fetchNews: Function;
  fetchDropdown: Function;
}

interface ListsState {
  currentInstrument: '';
}

var countryOptions = [
  { value: 'AAPL', text: 'Apple' },
  { value: 'AMZN', text: 'Amazon' },
  { value: 'BABA', text: 'Alibaba' },
  { value: 'IBM', text: 'IBM' },
  { value: 'TSLA', text: 'Tesla' },
  { value: 'SNE', text: 'Sony' },
  { value: 'JYN', text: 'JPY/USD' },
  { value: 'GBB', text: 'GBP/USD' },
  { value: 'ERO', text: 'EUR/USD' },
];
var dropdownStyle = {
  width: '200px'
}

class Lists extends React.Component<ListsProps, ListsState> {
    constructor(props: ListsProps) {
      super(props);
    }
    /*
    changeSelected(event: { target: { value: any; }; }) {
      //this.setState({newsKey: event.target.value});
      fetchNews();
    }
    */

    render() {
      return (
        <div>
          <Dropdown id="select_news" onChange={(e,data) => this.props.fetchDropdown(data.value)} style = {dropdownStyle} placeholder='Select Country' fluid search selection options={countryOptions} />
            {/* <select id="select_news" onChange={(e) => this.props.fetchNews(e)}>
              <option value="AAPL">Apple</option>
              <option value="AMZN">Amazon</option>
              <option value="BABA">Alibaba</option>
              <option value="IBM">IBM</option>
              <option value="TSLA">Tesla</option>
              <option value="SNE">Sony</option>
              <option value="JYN">JPY/USD</option>
              <option value="GBB">GBP/USD</option>
              <option value="ERO">EUR/USD</option>
            </select> */}
        </div>
      );
    }
}

const mapStatetoProps = (state: any) => {
  return {
    currentInstrument: state.currentInstrument,
  };
};

// const ConnectedLists = connect((state: ListsState) => ({
//   newsKey: state.newsKey,
// }))(Lists);

export default connect(mapStatetoProps, {})(Lists);