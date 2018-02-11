import * as React from 'react';
import './watchlist-panel.css';

import PanelMenuBar from '../panel-menu-bar/panel-menu-bar';

interface WatchListListProps { 
    panel: string;
    selectInstru: any;
}

interface WatchListListState { }

import { Dropdown, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { ActionAddInstru } from '../../../../actions/watchlistAction';

var instruOptions = [ 
  { value: 'AAPL', text: 'Apple' },
  { value: 'AMZN', text: 'Amazon' },
  { value: 'BABA', text: 'Alibaba' },
  { value: 'IBM', text: 'IBM' },
  { value: 'TSLA', text: 'Tesla' },
  { value: 'SNE', text: 'Sony' },
  { value: 'JYN', text: 'JPY/USD' },
  { value: 'GBB', text: 'GBP/USD' },
  { value: 'ERO', text: 'EUR/USD' }
];

var dropdownStyle = {
  //display: 'block',
  width: 'calc(100%)',
  margin : '0'
}

class WatchListList extends React.Component<WatchListListProps, WatchListListState> {

  constructor(props: WatchListListProps) {
    super(props);
  }

  buttonInstruSelect = () => {
    let dropdown = document.querySelectorAll('a.ui.label') as HTMLCollectionOf<HTMLElement>;
    //console.log(dropdown);
    var instruArray = [];
    for (var i=0; i<dropdown.length; i++) {
        console.log(dropdown[i].attributes[1].value);
        instruArray.push(dropdown[i].attributes[1].value);
    }
    this.props.selectInstru(instruArray);
  }

  render() {
    return (
      <div>
        <div className="ui form">
          <div className="required sixteen wide field">
            <div className="ui action input">
              {/* <div style={{width: 'calc(100% - 60px)'}}> */}
              <Dropdown id="watchlistDropdown" style={dropdownStyle} placeholder='Please select the instruments' fluid multiple search selection options={instruOptions} />
              <Button icon onClick={this.buttonInstruSelect}>
                <i style={{ display: "inline" }} className="fa fa-check-square-o"></i>
              </Button>  
              <PanelMenuBar panel={this.props.panel} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
    return {};
}; 

const mapDispatchToProps = (dispatch: any) => {
    return {
        selectInstru: (instru: string) => {
            dispatch(ActionAddInstru(instru));
        }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(WatchListList);