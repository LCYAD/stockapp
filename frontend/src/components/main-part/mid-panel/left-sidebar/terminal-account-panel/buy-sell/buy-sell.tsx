import * as React from 'react';
import './buy-sell.css';

import axios from 'axios';

import { connect } from 'react-redux';

import { Header, Icon, Button, Form } from 'semantic-ui-react';

import { changePane1 } from '../../../../../../actions/useraccount-brokerpaneAction';

// import actions
import { updateUserSetting } from '../../../../../../actions/userAction';
import { successMsg, failMsg, hideMsg } from '../../../../../../actions/notificationAction';

interface BuySellProps {
    user_setting: {
        currency: string;
        type: string;
        balance: string;
        leverage: string;
        beta_low: string;
        beta_high: string;
    },
    userSettingUpdate: Function;
    beta_error: Function;
    token: string;
}

interface BuySellState {
    loadForm: boolean;
    currency: string;
    balance: number;
    leverage: number;
    beta_high: number;
    beta_low: number;
}

class BuySell extends React.Component<BuySellProps, BuySellState> {

    constructor(props: any) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.loadUserForm = this.loadUserForm.bind(this);
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

        const { currency , balance, leverage } = this.state;

        return (
            <Form
                onSubmit={this.handleUserUpdate}
            >
                <Form.Field 
                    inline={true}
                    label='Type'
                    control='select'
                    name='currency'
                    value={currency}
                    onChange={this.handleChange}
                >
                    <option value='market'>Market</option>
                    <option value='limit'>Limit</option>
                </Form.Field>
                <Form.Field 
                    inline={true}
                    label='Instrument'
                    control='input'
                    type='text'
                    name='leverage'
                    value={leverage}
                    onChange={this.handleChange}
                />
                <Form.Field 
                    inline={true}
                    label='Unit'
                    control='input'
                    type='number'
                    min='1'
                    name='balance'
                    value={balance}
                    onChange={this.handleChange}
                />
                <Form.Field 
                    inline={true}
                    label='Price'
                    control='input'
                    type='number'
                    name='leverage'
                    value={leverage}
                    onChange={this.handleChange}
                />
                <Button 
                    type="submit"
                    primary={true}
                    className="user-setting-submit-btn"
                >
                    Submit Order Now
                </Button>
            </Form>
        );
    }


    render() {
        return (
            <div className="user-setting-pane-box">
                <div className="user-setting-pane-title">
                    <Header
                        as='h4'
                        icon={true}
                    >
                        <Icon
                            name='usd'
                        />
                        <i>Buys and Sell</i>
                    </Header>
                </div>
                {this.loadUserForm()}
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

export default connect(mapStatetoProps, mapDispatchToProps)(BuySell);