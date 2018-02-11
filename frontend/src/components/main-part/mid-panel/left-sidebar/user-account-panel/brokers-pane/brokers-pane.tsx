import * as React from 'react';
import './brokers-pane.css';

import { connect } from 'react-redux';

import { Form, Button, Input } from 'semantic-ui-react';

import axios from 'axios';

// import actions
import { changePane2 } from '../../../../../../actions/useraccount-brokerpaneAction';
import { oandaTokenValidity, changeOnadaKey } from '../../../../../../actions/userAction';
import { successMsg, failMsg, hideMsg } from '../../../../../../actions/notificationAction';

interface BrokersPaneProps {
    oandatoken: string;
    oandavalid: boolean;
    token: string;
    checkOandaBrokerToken: Function;
}

interface BrokersPaneState {
    oandaKey: string;
    oandaKeyDirty: boolean;
}

class BrokersPane extends React.Component<BrokersPaneProps, BrokersPaneState> {

    constructor(props: BrokersPaneProps) {
        super(props);
        this.loadOandaStatus = this.loadOandaStatus.bind(this);
        this.submitOandaKey = this.submitOandaKey.bind(this);
        this.handleOandaKeyChange = this.handleOandaKeyChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            oandaKey: "",
            oandaKeyDirty: false,
        });
    }

    loadOandaStatus() {
        if (this.props.oandatoken && this.props.oandavalid) {
            return (
                <span>API Valid</span>
            );
        } else if (this.props.oandatoken) {
            return (
                <span>API Key Invalid</span>
            );
        } else {
            return (
                <span>No Oanda API key</span>
            );
        }
    }

    handleOandaKeyChange(e: any) {
        if (!this.state.oandaKeyDirty) {
            this.setState({
                oandaKey: e.target.value,
                oandaKeyDirty: true,
            });
        } else {
            this.setState({ oandaKey: e.target.value });
        }

    }

    submitOandaKey() {
        // console.log(this.state.oandaKey);
        if (this.state.oandaKeyDirty) {
            this.props.checkOandaBrokerToken(this.state.oandaKey, this.props.token);
            this.setState({
                oandaKey: "",
                oandaKeyDirty: false,
            });
        }
    }

    render() {
        return (
            <div className="brokers-pane-box">
                <div className="broker-api-box">
                    <div className="broker-image-box">
                        <img
                            src="https://yt3.ggpht.com/-87iWZPt-BFY/AAAAAAAAAAI/AAAAAAAAAAA/vEYA1OIbB80/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg"
                            width="100"
                            height="100"
                        />
                    </div>
                    <div className="broker-api-content-box">
                        API Key: <i>{this.loadOandaStatus()}</i>
                    </div>
                    <div className="broker-api-key-box">
                        <Form
                            size={'mini'}
                            onSubmit={this.submitOandaKey}
                        >
                            <Form.Field inline>
                                <Input
                                    placeholder='API Key here'
                                    size={'mini'}
                                    value={this.state.oandaKey}
                                    onChange={this.handleOandaKeyChange}
                                />
                                <Button
                                    type="submit"
                                    size="mini"
                                    className="api-key-submit-btn"
                                >
                                    Submit
                            </Button>
                            </Form.Field>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
} // End BrokersPane Class

const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props,
        oandatoken: state.user.oandatoken,
        oandavalid: state.user.oandavalid,
        token: state.user.token,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        checkOandaBrokerToken: (oandatoken: string, usertoken: string) => {
            /* Steps:
                1. Loading Start
                2. Update key on Server
                3. Check Key Validity
                4. If all pass, end Loading with Success
            */
            dispatch(changePane2(true));
            //post token to server
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/broker/oanda',
                headers: {
                    'Authorization': 'bearer ' + usertoken,
                    'Content-Type': 'application/json'
                },
                data: {
                    oandatoken: oandatoken
                }
            }).then((res) => {
                // console.log(res);
                dispatch(changeOnadaKey(res.data.oandatoken[0]));
                let link = `https://api-fxpractice.oanda.com/v3/accounts`;
                axios.get(link, {
                    headers: { 'Authorization': `Bearer ${res.data.oandatoken[0]}` }
                }).then((res) => {
                    console.log(res);
                    dispatch(oandaTokenValidity(true));
                    dispatch(changePane2(false));
                    dispatch(successMsg('API valid!', 'You can now access the terminal.'));
                    setTimeout(() => { dispatch(hideMsg()); }, 3000);
                }).catch((err) => {
                    console.log(err);
                    dispatch(oandaTokenValidity(false));
                    dispatch(changePane2(false));
                    dispatch(failMsg('Invalid API key!', 'Please check your API keys again'));
                    setTimeout(() => { dispatch(hideMsg()); }, 3000);
                });
            }).catch((err) => {
                console.log(err);
                dispatch(oandaTokenValidity(false));
                dispatch(changePane2(false));
                dispatch(failMsg('Server not connected!', 'Oops, something went wrong.'));
                setTimeout(() => { dispatch(hideMsg()); }, 3000);
            });
        },
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(BrokersPane);