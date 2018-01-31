import * as React from 'react';
//import NewsType from '../newstype.model';
import News from './news';
import { connect } from 'react-redux'; 

/*interface NewsListProps {
   newslist: NewsType[];
}*/

class NewsList extends React.Component<any, {}> {
    
    newsShow() {
        //console.log(this.props.newslist);
        if (this.props.newslist.newslist) {
            return this.props.newslist.newslist.map((news: any) => {
                return (
                    <div key={news.url}>
                        <News title={news.title} url={news.url} description={news.description}/>
                    </div>
                );
                });
        }
        else return (<div/>);
    }

    render() {
      return (
        <div>
            {this.newsShow()}
        </div>
      );
    }
}

const mapStatetoProps = (state: any) => {
    console.log(state)
    return {
      newslist: state.newsReducer
    };
};

/*
const ConnectedNewsList = connect((state: RootState) => ({
    newslist: state.newslist,
  }))(NewsList);
*/

export default connect(mapStatetoProps, {})(NewsList);