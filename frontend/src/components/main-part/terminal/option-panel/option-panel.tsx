import * as React from 'react';
import './option-panel.css';

import { Button, Icon } from 'semantic-ui-react';

import { connect } from 'react-redux';

// import actions
import { loadNews, loadChart, loadWatchList } from '../../../../actions/TpanelSettingAction';

interface OptionPanelProps {
  panel: string;
  loadNews: Function;
  loadWatchList: Function;
  loadChart: Function;
}

interface OptionPanelState { }

class OptionPanel extends React.Component<OptionPanelProps, OptionPanelState> {

  constructor(props: OptionPanelProps) {
    super(props);
    this.handleloadWatchList = this.handleloadWatchList.bind(this);
    this.handleloadChart = this.handleloadChart.bind(this);
    this.handleloadNews = this.handleloadNews.bind(this);
  }

  handleloadWatchList() {
    this.props.loadWatchList(this.props.panel);
  }

  handleloadChart() {
    this.props.loadChart(this.props.panel);
  }

  handleloadNews() {
    this.props.loadNews(this.props.panel);
  }

  render() {
    return (
      <div className="option-container">
        <div className="option-box">
          
          <div className="option-btn-box">
            <span className="option-btn-title">
              <i>Component:</i>
            </span>
            <Button.Group
              basic={true}
              secondary={true}
            >
              <Button
                animated={true}
                inverted={true}
                onClick={this.handleloadWatchList}
                size="tiny"
              >
                <Button.Content
                  visible={true}
                >
                  <Icon
                    name="table"
                  />
                </Button.Content>
                <Button.Content
                  hidden={true}
                  className="option-btn-icon-name"
                >
                  Watchlist
                </Button.Content>
              </Button>
              <Button
                animated={true}
                inverted={true}
                onClick={this.handleloadChart}
                size="tiny"
              >
                <Button.Content
                  visible={true}
                >
                  <Icon
                    name="line chart"
                  />
                </Button.Content>
                <Button.Content
                  hidden={true}
                  className="option-btn-icon-name"
                >
                  Chart
                </Button.Content>
              </Button>
              <Button
                animated={true}
                inverted={true}
                onClick={this.handleloadNews}
                size="tiny"
              >
                <Button.Content
                  visible={true}
                >
                  <Icon
                    name="newspaper"
                  />
                </Button.Content>
                <Button.Content
                  hidden={true}
                  className="option-btn-icon-name"
                >
                  News
                </Button.Content>
              </Button>
            </Button.Group>
          </div>
        </div>
      </div>
    );
  }
} // End OptionPanel Class

const mapStatetoProps = (state: any, props: any) => {
  return {
    ...props,
  };
};

const mapDispatchToProps = (dispatch: any) =>{
  return {
    loadNews: (panelNum: number) => {
      dispatch(loadNews(panelNum));
    },
    loadWatchList: (panelNum: number) => {
      dispatch(loadWatchList(panelNum));
    },
    loadChart: (panelNum: number) => {
      dispatch(loadChart(panelNum));
    },
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(OptionPanel);