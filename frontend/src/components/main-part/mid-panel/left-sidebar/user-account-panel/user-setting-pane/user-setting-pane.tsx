import * as React from 'react';
import './user-setting-pane.css';

import { connect } from 'react-redux';

import { Header, Icon, Table } from 'semantic-ui-react';

interface UserSettingProps {
    user_setting: {
        currency: string;
        balance: string;
        leverage: string;
        beta_low: string;
        beta_high: string;
    }
}

interface UserSettingState {
}

class UserSetting extends React.Component<UserSettingProps, UserSettingState> {

    constructor(props: UserSettingProps) {
        super(props);
    }

    render() {
        console.log('User Setting', this.props.user_setting);
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
                <div className="user-setting-pane-table">
                <Table 
                    basic='very' 
                    celled={true} 
                    collapsing={true}
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
                            22
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                        <Header as='h4'>
                            <Header.Content>
                                Matthew
                            <Header.Subheader>Fabric Design</Header.Subheader>
                            </Header.Content>
                        </Header>
                        </Table.Cell>
                        <Table.Cell>
                            15
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                        <Header as='h4'>
                            <Header.Content>
                                Lindsay
                            <Header.Subheader>Entertainment</Header.Subheader>
                            </Header.Content>
                        </Header>
                        </Table.Cell>
                        <Table.Cell>
                            12
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                        <Header as='h4'>
                            <Header.Content>
                                Mark
                            <Header.Subheader>Executive</Header.Subheader>
                            </Header.Content>
                        </Header>
                        </Table.Cell>
                        <Table.Cell>
                            11
                        </Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
                </div>
            </div>
        );
    }
} // End UserSetting Class

const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props,
        user_setting: state.user.user_setting,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(UserSetting);