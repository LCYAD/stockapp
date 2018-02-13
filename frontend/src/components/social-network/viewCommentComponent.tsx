import * as React from 'react'; 
import * as $ from 'jquery';
import { connect } from 'react-redux'; 
//import Post from '../post.model'
//import { Button } from 'semantic-ui-react';

// React component for the front side of the card
class Comment extends React.Component<any,any> {

  render() {
      //console.log(this.props.post.img);
     // console.log(this.props);
     // var postId = this.props.post.date;
     // var imgArray = this.props.post.img.slice(2, -2).split('","');
      var date = (new Date(parseFloat(this.props.post.date))).toString();
      //console.log(date);
      //console.log(imgArray);
    return(
            <div style={{textAlign: 'left', paddingTop: '0px', paddingBottom: '5px'}} className='col-xs-6 side-front-content' /*style={postContentStyle}*/>
              <b style={{size: '10px'}}> {this.props.post.name} </b> 
              <small style={{color: 'grey'}}> &emsp; {date} </small>
              <p style={{textAlign: 'left'}}> {this.props.post.msg} </p>
            </div>
    )
  }
}

class ViewCommentComponent extends React.Component<{ post: any },any> {
    state: any;

    componentDidMount() {
        console.log(this.state);
        console.log(this.props);
    }

    render() {
        console.log(this.props.post.comment)
        var comments_raw = this.props.post.comment;
        var comments = $.parseJSON('[' + comments_raw + ']');
        return comments.reverse().map(( p: any) => {

            return (
                <div key={p.date}>
                    <Comment post={p}/>
                </div>
            );
            });
    }
  }

const mapStatetoProps = (state: any) => {
    console.log(state)
    return {
      ...state, user: state.user
    };
};

export default connect(mapStatetoProps, {})(ViewCommentComponent);

