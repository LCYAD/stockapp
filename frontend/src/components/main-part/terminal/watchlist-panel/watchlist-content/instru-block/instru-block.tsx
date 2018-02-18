import * as React from 'react';
import './instru-block.css';


import { Segment, Button } from 'semantic-ui-react';
import { ActionFetchChartData, ActionFetchNews } from '../../../../../../actions/newsAction';
import { connect } from 'react-redux';

interface InstruBlockProps {
    data: any
    index: number
    removeInstru: Function;
    fetchChartData: any;
    fetchNews: any;
}

interface InstruBlockState { }

class InstruBlock extends React.Component<InstruBlockProps, InstruBlockState> {

    constructor(props: any) {
        super(props);
    }

    buttonInstruTrigger = () => {
        this.props.fetchChartData(this.props.data.instrument);
        this.props.fetchNews(this.props.data.instrument);
    }
    render() {
        return (
            <Segment
                className="instru-block-box"
            >
               <Button onClick={this.buttonInstruTrigger}> {this.props.data.instrument} </Button>
                {this.props.data.ask}
                {this.props.data.bid}
                {this.props.index}
                <Button
                    icon="close"
                    onClick={()=>this.props.removeInstru(this.props.index)}
                />
            </Segment>
        );
    }
}

const mapStateToProps = (state:any, props:any) => {
    return {
        ...props
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchChartData: (instru: string) => {
            dispatch(ActionFetchChartData(instru));
        },
        fetchNews: (instru: string) => {
            dispatch(ActionFetchNews(instru));
        }
    };

}

export default connect(mapStateToProps,mapDispatchToProps)(InstruBlock);