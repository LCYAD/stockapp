import * as React from 'react';
import { connect } from 'react-redux';

import './notification.css';

interface NotificationProps {
    type: string;
    title: string;
    message: string;
}

interface NotificationState { }

class Notification extends React.Component<NotificationProps, NotificationState> {
    render() {
        let notification;
        if (this.props.type === 'hide') {
            notification = <div className="notification hide"/>;
        } else if (this.props.type === 'success') {
            notification =  
            (
                <div className="notification success">
                    <span className="notification-title">{this.props.title}: </span>
                    <span className="notification-msg">{this.props.message}</span>
                </div>
            );
        } else {
            notification =  
            (
                <div className="notification fail">
                    <span className="notification-title">{this.props.title}: </span>
                    <span className="notification-msg">{this.props.message}</span>
                </div>
            );
        }

        return (
            <div id="notification-bar">
                {notification}
            </div>
        );
    } // End Notification Class
}
const mapStatetoProps = (state: any) => {
    return {
        type: state.notification.type,
        title: state.notification.title,
        message: state.notification.message
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Notification);