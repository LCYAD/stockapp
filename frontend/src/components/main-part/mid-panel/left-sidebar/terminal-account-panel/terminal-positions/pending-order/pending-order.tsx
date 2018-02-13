import * as React from 'react';
import './pending-order.css';

import axios from 'axios';

import { connect } from 'react-redux';

import { Table,  Icon } from 'semantic-ui-react';

// import actions
import { changeTPositionPane } from '../../../../../../../actions/panelToggleAction';
import { successMsg, failMsg, hideMsg } from '../../../../../../../actions/notificationAction';

interface PendingOrderProps {
    oandatoken: string;
    accountsID: string;
    changeTPositionPane: Function;
    cancelOrderSuccess: Function;
    cancelOrderFailure: Function;
}

interface PendingOrderState { 
    orders: any[];
}

class PendingOrder extends React.Component<PendingOrderProps, PendingOrderState> {

    constructor(props: any) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
        this.getPendingOrder = this.getPendingOrder.bind(this);
    }

    componentWillMount() {
        this.setState({
            orders: []
        });
        this.props.changeTPositionPane(true);
        this.getPendingOrder();
    }

    getPendingOrder() {
        axios({
            method: 'get',
            url: `https://api-fxpractice.oanda.com/v3/accounts/${this.props.accountsID[0]}/pendingOrders`,
            headers: {
                'Authorization': 'bearer ' + this.props.oandatoken,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            // console.log(res.data);
            this.setState({
                orders: res.data.orders
            });
            this.props.changeTPositionPane(false);
        }).catch((err) => {
            console.log(err);
            this.props.changeTPositionPane(false);
        });
    }

    cancelOrder(id: string) {
        let result = confirm(`Do you really want to cancel this order:  ${id}`);
        if (result) {
            // do a post then return with a get
            // console.log(id);
            axios({
                method: 'put',
                url: `https://api-fxpractice.oanda.com/v3/accounts/${this.props.accountsID[0]}/orders/${id}/cancel`,
                headers: {
                    'Authorization': 'bearer ' + this.props.oandatoken,
                    'Content-Type': 'application/json'
                    }
            }).then((res)=>{
                this.props.cancelOrderSuccess();
                this.getPendingOrder();
            }).catch((err)=>{
                console.log(err);
                this.props.cancelOrderFailure();
                this.props.changeTPositionPane(false);
            });
        }
    }

    loadData() {
        return this.state.orders.map((order, index) => {
            console.log(order);
            let order_type: string;
            let order_unit: number;
            if (order.units < 0) {
                order_type = 'SELL';
                order_unit = Number(order.units) * -1;
            } else {
                order_type = 'BUY';
                order_unit = order.units;
            }
            return (
                <Table.Row key={index}>
                    <Table.Cell className="open-position-cell">{order.id}</Table.Cell>
                    <Table.Cell className="open-position-cell">{order.instrument}</Table.Cell>
                    <Table.Cell className="open-position-cell">{order_unit}</Table.Cell>
                    <Table.Cell className="open-position-cell">{order_type}</Table.Cell>
                    <Table.Cell className="open-position-cell">{order.price}</Table.Cell>
                    <Table.Cell className="open-position-cell">{order.timeInForce}</Table.Cell>
                    <Table.Cell
                        textAlign="center"
                    >
                        <button 
                            className="close-position-btn" 
                            onClick={() => this.cancelOrder(order.id)}
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
                        <Table.HeaderCell>Ticket</Table.HeaderCell>
                        <Table.HeaderCell>Market</Table.HeaderCell>
                        <Table.HeaderCell>Units</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>TimeInForce</Table.HeaderCell>
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
} // End PendingOrder Class

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
            dispatch(changeTPositionPane('1', load));
        },
        cancelOrderSuccess: () => {
            dispatch(successMsg('Request Done!', 'Your pending order has been cancelled successfully.'));
            setTimeout(() => { dispatch(hideMsg()); }, 3000);
        },
        cancelOrderFailure: () => {
            dispatch(failMsg('Request Rejected!', 'Oops...Something went wrong.'));
            setTimeout(() => { dispatch(hideMsg()); }, 3000);
        },
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(PendingOrder);