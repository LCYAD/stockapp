import * as React from 'react'; 
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux'; 
import { /*ActionFetchComment, */ActionFetchPost } from '../../../actions/newsAction';
//import { ActionFetchPost } from '../../../actions/newsAction';

// React component for textarea
// class CardTextarea extends React.Component<any,any> {
//     render() {
//       return(
//         <fieldset>
//           <textarea name={this.props.username} id={this.props.id} placeholder={this.props.placeholder} required ></textarea>
//         </fieldset>
//       )
//     }
//   }
  
  // React component for form button
class CardBtn extends React.Component<any,any> {
    render() {
      return(
       // <fieldset>
          <Button style={{float : 'right',marginBottom : '20px'}} className={this.props.className} type={this.props.type} value={this.props.value}>{this.props.value}</Button>
        //</fieldset>
      )
    }
  }

interface AddCommentProps { 
    user: any;
    fetchComment?: any;
    fetchPost?: any;
    postId: any;
  }

class AddCommentComponent extends React.Component<AddCommentProps, any> {
    
    commentMsg: any;
    handleSubmit(e:any) {
        e.preventDefault();
        console.log(this.commentMsg)
        this.setState({
            msg: /*[...this.state.msg, this.postMsg]*/ this.commentMsg,
        }, () => {
            
            if (this.props.user.name == 'undefined') {
                var name = this.props.user.email;
            } else {
                var name = this.props.user.name
            }

            var commentData = {
                postId : this.props.postId,
                comment: {
                    name : name,
                    email : this.props.user.email,
                    date: Date.now(),
                    msg: this.state.msg,
                }    
            };
            console.log(commentData);
            axios.post("http://localhost:8080/api/comment", commentData
                        // , {
                        //     headers: { 'Access-Control-Allow-Origin': '*', "X-Requested-With": "XMLHttpRequest", 'Accept': 'application/json',
                        //     'Content-Type': 'application/json' },
                        //     }
            ).then((response:any) => { 
                    console.log(response);
                    this.props.fetchPost(this.props.user);
                }) 
                .catch((error)=> console.log(error));     
            }    
        );
        //this.setState({ open: false });
    }
    
    handleMsgChange(e:any) {
        e.preventDefault();
        this.commentMsg = e.target.value;
    }

    render() {
        return (
            <div className='container-fluid'>
                
                <form action='' className='card-form' onSubmit={(e)=>this.handleSubmit(e)}>            
                {/* <CardTextarea name='commentMessage' id='commentMessage' onChange={(e:any)=>this.handleMsgChange(e)} placeholder='Your comment' /> */}
                
                <textarea name='commentMessage' id='commentMessage' onChange={(e)=>this.handleMsgChange(e)} placeholder='Your comment' />
                <CardBtn className='btn btn-primary' type='submit' onClick={(e:any)=>this.handleSubmit(e)} value='Send comment' />
                </form>

            </div>
        )
    }  
}

const mapStatetoProps = (state: any) => {
    console.log(state)
    return {
      ...state
     // post: state.newsReducer.post
    };
};

const mapDispatchToProps = (dispatch: any) =>{
    return {
    //   fetchComment: (key: string) => {
    //     console.log('run fetch comment')
    //     dispatch(ActionFetchComment(key));
    //   },
      fetchPost: (key: string) => {
        console.log('run fetch post')
        dispatch(ActionFetchPost(key));
      }
    };
  }
/*
const ConnectedNewsList = connect((state: RootState) => ({
    newslist: state.newslist,
  }))(NewsList);
*/

export default connect(mapStatetoProps, mapDispatchToProps)(AddCommentComponent);
