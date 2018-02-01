import * as React from 'react';
import { connect } from 'react-redux';

import './notification.css';

interface NotificationProps {}
  
interface NotificationState {}

class Notification extends React.Component<NotificationProps, NotificationState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
        <div id="notification-bar">
            Notification Bar
        </div>

        );
    } // End Notification Class
}
const mapStatetoProps = (state: any) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Notification);