import * as React from 'react';
import './instru-block.css';


import { Segment, Button } from 'semantic-ui-react';

interface InstruBlockProps {
    data: any
    index: number
    removeInstru: Function;
}

interface InstruBlockState { }

class InstruBlock extends React.Component<InstruBlockProps, InstruBlockState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Segment
                className="instru-block-box"
            >
                {this.props.data.instrument}
                {this.props.index}
                <Button
                    icon="close"
                    onClick={()=>this.props.removeInstru(this.props.index)}
                />
            </Segment>
        );
    }
}

export default InstruBlock;