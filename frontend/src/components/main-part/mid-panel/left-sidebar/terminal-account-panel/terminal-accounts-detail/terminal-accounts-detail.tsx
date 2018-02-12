import * as React from 'react';
import './terminal-accounts-detail.css';
import axios from 'axios';

import { connect } from 'react-redux';

import { Accordion, Icon, Table, Header } from 'semantic-ui-react';

// import action
import { changeTAccountPane } from '../../../../../../actions/panelToggleAction';

interface TerminalAccountsDetailProps {
    token: string;
    oandatoken: string;
    accountsID: string[];
    changeTPaneLoading: Function;
}

interface TerminalAccountsDetailState {
    accountDetail: {
        NAV: number;
        balance: number;
        currency: string;
        positionValue: number;
        pl: number;
        unrealizedPL: number;
        marginRate: number;
    };
    activeIndex: number;
}

class TerminalAccountsDetail extends React.Component<TerminalAccountsDetailProps, TerminalAccountsDetailState> {

    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.props.changeTPaneLoading(true);
        this.setState({
            activeIndex: 0,
            accountDetail: {
                NAV: 0,
                balance: 0,
                currency: '',
                positionValue: 0,
                pl: 0,
                unrealizedPL: 0,
                marginRate: 0,
            }
        });
        axios({
            method: 'get',
            url: `https://api-fxpractice.oanda.com/v3/accounts/${this.props.accountsID[0]}/summary`,
            headers: {
                'Authorization': 'bearer ' + this.props.oandatoken,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res.data.account);
            this.setState({
                accountDetail: {
                    NAV: Math.round(Number(res.data.account.NAV)*100)/100,
                    balance: Math.round(Number(res.data.account.balance)*100)/100,
                    currency: res.data.account.currency,
                    positionValue: Math.round(Number(res.data.account.positionValue)*100)/100,
                    pl: Math.round(Number(res.data.account.pl)*100)/100,
                    unrealizedPL: Math.round(Number(res.data.account.unrealizedPL)*100)/100,
                    marginRate: 1/Number(res.data.account.marginRate),
                }
            });
            this.props.changeTPaneLoading(false);
        }).catch((err) => {
            console.log(err);
            this.props.changeTPaneLoading(false);
        });
    }

    handleClick(e:any, titleProps:any) {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex, accountDetail } = this.state;
        return (
            <div id="terminal-accounts-detail-container">
                <Accordion>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        <i>Account No:</i> {this.props.accountsID[0]}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                    <Table
                        basic="very"
                        className="user-setting-pane-table"
                    >
                        <Table.Header
                            fullWidth={true}
                        >
                            <Table.Row>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Value</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
        
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4'>
                                        <Header.Content>
                                            Currency
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {accountDetail.currency}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4'>
                                        <Header.Content>
                                            Balance
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {accountDetail.balance}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4'>
                                        <Header.Content>
                                            NAV
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {accountDetail.NAV}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4'>
                                        <Header.Content>
                                            Position Value
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {accountDetail.positionValue}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4'>
                                        <Header.Content>
                                            PL
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {accountDetail.pl}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4'>
                                        <Header.Content>
                                           Unrealized PL
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {accountDetail.unrealizedPL}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4'>
                                        <Header.Content>
                                           Margin Rate
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {accountDetail.marginRate}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        <i>Account No:</i> {this.props.accountsID[1]}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>
                        Cannot Access Account
                        </p>
                    </Accordion.Content>
                </Accordion>
            </div>
        );
    }
} // End TerminalAccountsDetail Class


const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props,
        token: state.user.token,
        oandatoken: state.user.oandatoken,
        accountsID: state.brokerOanda.accountsID,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeTPaneLoading: (load: boolean) => {
            dispatch(changeTAccountPane('1', load));
        },
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(TerminalAccountsDetail);