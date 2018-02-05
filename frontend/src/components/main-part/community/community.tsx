import * as React from 'react';
import './community.css';

interface CommunityProps { }

interface CommunityState { }

class Community extends React.Component<CommunityProps, CommunityState> {

    render() {
        return (
            <div id="community-container">
                This is the Community panel
            </div>
        );
    }
} // End Community Class

export default Community;