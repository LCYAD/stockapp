import * as React from 'react';
import './user-setting-pane.css';

import axios from 'axios';

import { connect } from 'react-redux';

import { Header, Icon, Table, Button, Form } from 'semantic-ui-react';

import { changePane1 } from '../../../../../../actions/useraccount-brokerpaneAction';

// import actions
import { updateUserSetting } from '../../../../../../actions/userAction';
import { successMsg, failMsg, hideMsg } from '../../../../../../actions/notificationAction';

interface UserSettingProps {
    user_setting: {
        currency: string;
        balance: string;
        leverage: string;
        beta_low: string;
        beta_high: string;
    },
    userSettingUpdate: Function;
    beta_error: Function;
    token: string;
}

interface UserSettingState {
    loadForm: boolean;
    currency: string;
    balance: number;
    leverage: number;
    beta_high: number;
    beta_low: number;
}

class UserSetting extends React.Component<UserSettingProps, UserSettingState> {

    constructor(props: UserSettingProps) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.loadUserForm = this.loadUserForm.bind(this);
        this.loadUserSummary = this.loadUserSummary.bind(this);
        this.handleUserUpdate = this.handleUserUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            loadForm: false,
            currency: 'USD',
            balance: 1,
            leverage: 1,
            beta_high: 1,
            beta_low: -1,
        });
    }

    toggleForm() {
        this.setState({
            loadForm: !this.state.loadForm
        })
    }

    handleUserUpdate() {
        const { currency , balance, leverage, beta_high, beta_low } = this.state;
        // console.log('Printing result', currency, balance, leverage, beta_low, beta_high);
        if (beta_high <= beta_low) {
            this.props.beta_error();
        } else {
            this.props.userSettingUpdate(this.props.token, {
                currency: currency,
                balance: balance,
                leverage: leverage,
                beta_high: beta_high,
                beta_low: beta_low,
            });
            this.setState({
                loadForm: false,
                currency: 'USD',
                balance: 1,
                leverage: 1,
                beta_high: 1,
                beta_low: -1,
            });
        }

    }

    handleChange(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loadUserForm() {

        const { currency , balance, leverage, beta_high, beta_low } = this.state;

        return (
            <Form
                onSubmit={this.handleUserUpdate}
            >
                <Form.Field 
                    inline={true}
                    label='Currency'
                    control='select'
                    name='currency'
                    value={currency}
                    onChange={this.handleChange}
                >
                    <option value='USD'>USD</option>
                    <option value='HKD'>HKD</option>
                </Form.Field>
                <Form.Field 
                    inline={true}
                    label='Balance $'
                    control='input'
                    type='number'
                    min='1'
                    name='balance'
                    value={balance}
                    onChange={this.handleChange}
                />
                <Form.Field 
                    inline={true}
                    label='Leverage'
                    control='input'
                    type='number'
                    min='1'
                    max='10'
                    name='leverage'
                    value={leverage}
                    onChange={this.handleChange}
                />
                <Form.Field 
                    inline={true}
                    label='Beta Low'
                    control='input'
                    type='number'
                    min='-3'
                    max='3'
                    step='0.1'
                    name='beta_low'
                    value={beta_low}
                    onChange={this.handleChange}
                />
                <Form.Field 
                    inline={true}
                    label='Beta High'
                    control='input'
                    type='number'
                    min='-3'
                    max='3'
                    step='0.1'
                    name='beta_high'
                    value={beta_high}
                    onChange={this.handleChange}
                />
                <Button 
                    type="submit"
                    primary={true}
                    className="user-setting-submit-btn"
                >
                    Update
                </Button>
            </Form>
        );
    }

    loadUserSummary() {
        return (
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
                                    <Header.Subheader>HKD or USD</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>
                            {this.props.user_setting.currency}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>
                                <Header.Content>
                                    Balance
                                    <Header.Subheader>in total</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>
                            {this.props.user_setting.balance}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>
                                <Header.Content>
                                    Leverage
                                    <Header.Subheader>Your Risk Level</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>
                            {this.props.user_setting.leverage}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>
                                <Header.Content>
                                    Beta
                                    <Header.Subheader>Preferrable</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>
                            {this.props.user_setting.beta_low} to {this.props.user_setting.beta_high}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }

    render() {
        let { loadForm } = this.state;
        return (
            <div className="user-setting-pane-box">
                <div className="user-setting-pane-title">
                    <Header
                        as='h4'
                        icon={true}
                    >
                        <Icon
                            name='user outline'
                        />
                        <i>User Settings</i>
                    </Header>
                </div>
                {loadForm ? this.loadUserForm() : this.loadUserSummary()}
                <Button
                    content={loadForm ? 'Back' : 'Update Settings'}
                    primary={true}
                    onClick={this.toggleForm}
                />
            </div>
        );
    }
} // End UserSetting Class

const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props,
        user_setting: state.user.user_setting,
        token: state.user.token,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        userSettingUpdate: (token: string, input: Object)=> {
            dispatch(changePane1(true));
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/user/setting',                
                headers: {
                    'Authorization': "bearer " + token,
                    'Content-Type': 'application/json'
                },
                data: {
                    user_setting: JSON.stringify(input)
                },
            })
            .then((res)=>{
                // console.log(res.data[0].user_setting);
                dispatch(updateUserSetting(res.data[0].user_setting));
                dispatch(successMsg('Update Complete!', 'Your user_setting has been updated.'));
                setTimeout(() => { dispatch(hideMsg()); }, 3000);
                dispatch(changePane1(false));
            }).catch((err)=> {
                dispatch(failMsg('Cannot Update!', 'Oops...Something went wrong.'));
                setTimeout(() => { dispatch(hideMsg()); }, 3000);
                dispatch(changePane1(false));
            })
        },
        beta_error: () => {
            dispatch(failMsg('Wrong input!', 'Beta High cannot be lower than Beta Low'));
            setTimeout(() => { dispatch(hideMsg()); }, 3000);
        },
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(UserSetting);