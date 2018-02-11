import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import '../news-panel/news-panel.css';
//import {connect} from 'react-redux';

interface NewsProps {
    title: string,
    url: string,
    description: string,
}

// var scrollStyle: React.CSSProperties = {
//   disaply: 'inline-block',
//   overflowY: 'scroll',
// }

class News extends React.Component<NewsProps, {}> {
    constructor(props: NewsProps) {
      super(props);
    }
    
    render() {
      return (
        <div id="newsBlock">
          <a href={this.props.url} className="fill-div">
          <Segment color='grey'>
            <b style={{color: 'black'}}>{this.props.title}</b>
            <p>{this.props.description}</p>          
          </Segment>
          </a>
        </div>
      );
    }
}

export default News;