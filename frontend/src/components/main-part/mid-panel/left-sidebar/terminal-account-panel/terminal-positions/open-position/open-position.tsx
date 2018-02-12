import * as React from 'react';
import './open-position.css';

import axios from 'axios';

import { connect } from 'react-redux';

import { Table,  Icon } from 'semantic-ui-react';

// import actions
import { changeTPositionPane } from '../../../../../../../actions/panelToggleAction';
import { successMsg, failMsg, hideMsg } from '../../../../../../../actions/notificationAction';


interface OpenPositionProps {
    oandatoken: string;
    accountsID: string;
    changeTPositionPane: Function;
    closePositionSuccess: Function;
    closePositionFailure: Function;
}

interface OpenPositionState { 
    positions: any[];
}

class OpenPosition extends React.Component<OpenPositionProps, OpenPositionState> {

    constructor(props: any) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.closePosition = this.closePosition.bind(this);
        this.getOpenPosition = this.getOpenPosition.bind(this);
    }

    componentWillMount() {
        this.setState({
            positions: []
        });
        this.props.changeTPositionPane(true);
        this.getOpenPosition();
    }

    getOpenPosition() {
        axios({
            method: 'get',
            url: `https://api-fxpractice.oanda.com/v3/accounts/${this.props.accountsID[0]}/openPositions`,
            headers: {
                'Authorization': 'bearer ' + this.props.oandatoken,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res.data.positions);
            this.setState({
                positions: res.data.positions
            });
            this.props.changeTPositionPane(false);
        }).catch((err) => {
            console.log(err);
            this.props.changeTPositionPane(false);
        });
    }

    closePosition(instrument: string, type: string) {
        let result = confirm(`Do you really want to close this position:  ${instrument}`);
        if (result) {
            // console.log(instrument);
            let data;
            if (type === "LONG"){
                data = {
                    "longUnits": "ALL"
                }
            } else{
                data = {
                    "shortUnits": "ALL"
                }
            }
            axios({
                method: 'put',
                url: `https://api-fxpractice.oanda.com/v3/accounts/${this.props.accountsID[0]}/positions/${instrument}/close`,
                data: data,
                headers: {
                    'Authorization': 'bearer ' + this.props.oandatoken,
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                this.getOpenPosition();
                this.props.closePositionSuccess();
            }).catch((err)=>{
                console.log(err);
                this.props.closePositionFailure();
                this.props.changeTPositionPane(false);
            });
        }
    }

    loadData() {
        return this.state.positions.map((position, index) => {
            let pos_type: string;
            let pos_unit: number;
            let pos_price: string;
            if (Number(position.long.units) < Number(position.short.units)*-1) {
                pos_type = 'SHORT';
                pos_unit = Number(position.short.units) * -1;
                pos_price = position.short.averagePrice;
            } else {
                pos_type = 'LONG';
                pos_unit = position.long.units;
                pos_price = position.long.averagePrice;
            }
            return (
                <Table.Row key={index}>
                    <Table.Cell className="open-position-cell">{position.instrument}</Table.Cell>
                    <Table.Cell className="open-position-cell">{pos_unit}</Table.Cell>
                    <Table.Cell className="open-position-cell">{pos_type}</Table.Cell>
                    <Table.Cell className="open-position-cell">{pos_price}</Table.Cell>
                    <Table.Cell
                        textAlign="center"
                    >
                        <button 
                            className="close-position-btn" 
                            onClick={() => this.closePosition(position.instrument, pos_type)}
                        >
                            <Icon name="close"/>
                        </button>
                    </Table.Cell>
                </Table.Row>
            );
        })
    }

    render() {

        return (
            <div id="open-position-pane">
                <Table 
                    celled={true}
                    selectable={true}
                    size="small"
                    compact={true}
                >
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Instrument</Table.HeaderCell>
                        <Table.HeaderCell>Unit</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.loadData()}
                    </Table.Body>
                </Table>
            </div>
        );
    }
} // End OpenPosition Class

const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props,
        oandatoken: state.user.oandatoken,
        accountsID: state.brokerOanda.accountsID,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeTPositionPane: (load: boolean) => {
            dispatch(changeTPositionPane('2', load));
        },
        closePositionSuccess: () => {
            dispatch(successMsg('Request Done!', 'Your postions has been closed successfully.'));
            setTimeout(() => { dispatch(hideMsg()); }, 3000);
        },
        closePositionFailure: () => {
            dispatch(failMsg('Request Rejected!', 'Oops...Something went wrong.'));
            setTimeout(() => { dispatch(hideMsg()); }, 3000);
        },
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(OpenPosition);