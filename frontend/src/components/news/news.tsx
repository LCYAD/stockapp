import * as React from 'react';
//import {connect} from 'react-redux';

interface NewsProps {
    title: string,
    url: string,
    description: string,
}

class News extends React.Component<NewsProps, {}> {
    constructor(props: NewsProps) {
      super(props);
    }
    
    render() {
      return (
        <div>
          <p>{this.props.title}</p>
          <p>{this.props.url}</p>
          <p>{this.props.description}</p>
        </div>
      );
    }
}

export default News;