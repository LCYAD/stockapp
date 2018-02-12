import * as React from 'react';
import './terminal-positions.css';

import { Tab } from 'semantic-ui-react';

import { connect } from 'react-redux';

// import components
import OpenPosition from './open-position/open-position';
import PendingOrder from './pending-order/pending-order';

interface TerminalPositionsProps {
    TPositionPane1: boolean;
    TPositionPane2: boolean;
}

interface TerminalPositionsState {}

class TerminalPositions extends React.Component<TerminalPositionsProps, TerminalPositionsState> {

    render() {
        const panes = [
            { menuItem: 'Pending Order', render: () =>  <Tab.Pane 
                                                            loading={this.props.TPositionPane1}
                                                            className='terminal-position-tab-pane'
                                                        >
                                                            <PendingOrder />
                                                        </Tab.Pane> },
            { menuItem: 'Open Position', render: () => <Tab.Pane 
                                                            loading={this.props.TPositionPane2}
                                                            className='terminal-position-tab-pane'
                                                        >
                                                            <OpenPosition />
                                                        </Tab.Pane> },
          ]
        return (
            <div id="terminal-position-container">
                <Tab 
                    panes={panes} 
                />
            </div>
        );
    }
} // End TerminalPositions Class

const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props,
        TPositionPane1: state.panelToggle.TPositionPane1,
        TPositionPane2: state.panelToggle.TPositionPane2
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

export default connect(mapStatetoProps, mapDispatchToProps)(TerminalPositions);