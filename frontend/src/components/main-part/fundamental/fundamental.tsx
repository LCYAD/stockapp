import * as React from 'react';
import './fundamental.css';

interface FundamentalProps { }

interface FundamentalState { }

class Fundamental extends React.Component<FundamentalProps, FundamentalState> {

    render() {
        return (
            <div id="fundamental-container">
                This is the fundamental panel
            </div>
        );
    }
} // End Fundamental Class

export default Fundamental;