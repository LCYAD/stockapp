import * as React from 'react'; 
//import { Button, Modal } from 'semantic-ui-react';
//import axios from 'axios';
import { connect } from 'react-redux'; 
//import Post from '../post.model'
import '../viewpost/viewPostComponent.css';

// React component for form inputs


class CardInput extends React.Component<any,any> {
  render() {
    return(
      <fieldset>
        <input name={this.props.name} id={this.props.id} type={this.props.type || 'text'} placeholder={this.props.placeholder} required />
      </fieldset>
    )
  }
}

// React component for textarea
class CardTextarea extends React.Component<any,any> {
  render() {
    return(
      <fieldset>
        <textarea name={this.props.username} id={this.props.id} placeholder={this.props.placeholder} required ></textarea>
      </fieldset>
    )
  }
}

// React component for form button
class CardBtn extends React.Component<any,any> {
  render() {
    return(
      <fieldset>
        <button className={this.props.className} type={this.props.type} value={this.props.value}>{this.props.value}</button>
      </fieldset>
    )
  }
}

// React component for social profile links
class CardProfileLinks extends React.Component<any,any> {
  render() {
    const profileLinks = ['twitter', 'linkedin', 'dribbble', 'facebook'];
    
    const linksList = profileLinks.map((link, index) =>
      <li key={index}><a href='#'><i className={'fa fa-' + link}></i></a></li>
    );
                                     
    return(
      <div className='card-social-links'>
        <ul className='social-links'>
          {linksList}
        </ul>
      </div>
    )
  }
}

var commentStyle: React.CSSProperties = {
    position: 'fixed',
    //clear: 'both',
    float: 'right',
    color: 'grey',
    marginTop: '10px',
    marginLeft: '90%',
    right: 'calc(0% + 18px)'
    //zIndex: 99
}

var scrollStyle: React.CSSProperties = {
    disaply: 'inline-block',
    overflowY: 'scroll',
    overflowX: 'auto',
    zIndex: 99
}

var scrollBackStyle: React.CSSProperties = {
    disaply: 'inline-block',
    overflowY: 'scroll',
    // overflowX: 'auto'
}

var postContentStyle = {
    paddingLeft: "15px"
}

var postMsgStyle = {
    paddingLeft: "15px"
}

var postImgStyle = {
    paddingTop: "10px",
    paddingLeft: "15px"
}

var dateStyle = {
    //size: "10px",
    color: "grey"
}
// React component for the front side of the card
class CardFront extends React.Component<any,any> {

  flip = (id:any) => {
    // let cardBody = document.getElementsByClassName('card-body') as HTMLCollectionOf<HTMLElement>;
    // cardBody[0].style.transform = "rotateY(180deg)";
    // let sideFront = document.getElementsByClassName('side-front') as HTMLCollectionOf<HTMLElement>;
    //     sideFront[0].style.zIndex = '1';
    //     sideFront[0].style.visibility = 'hidden';
    // let sideBack = document.getElementsByClassName('side-back') as HTMLCollectionOf<HTMLElement>;
    //     sideBack[0].style.zIndex = '99';
    //     sideBack[0].style.visibility = 'visible';

    /////////////
    let cardBody = document.querySelectorAll('div.card-container .id'+id) as HTMLCollectionOf<HTMLElement>;
        //console.log(cardContainer);
    // let cardBody = document.querySelectorAll('div.card-body .id'+id) as HTMLCollectionOf<HTMLElement>;
    //let cardBody = document.getElementsByClassName('card-body') as HTMLCollectionOf<HTMLElement>;
    // for (var n=0; n<cardBody.length; n++) {
    //    console.log(cardBody)
        cardBody[0].style.transform = "rotateY(180deg)";
        cardBody[1].style.zIndex = '99';
        cardBody[1].style.visibility = 'visible';

        //cardBody[1].style.transform = "rotateX(180deg)";
        cardBody[2].style.zIndex = '1';
        cardBody[2].style.visibility = 'hidden';
    // }

    // cardBody[0].style.opacity = "0";
    // cardBody[0].style.visibility = "hidden";
    // cardBody[0].style.transition = "opacity 1s ease-in, visibility .75s linear";

    // let sideFront = document.querySelectorAll('div.side-front .id'+id) as HTMLCollectionOf<HTMLElement>;
    // //let sideFront = document.getElementsByClassName('side-front') as HTMLCollectionOf<HTMLElement>;
    // for (var n=0; n<sideFront.length; n++) {
    //     sideFront[n].style.zIndex = '1';
    //     sideFront[n].style.visibility = 'hidden';
    // }    

    // let sideBack = document.querySelectorAll('div.side-back .id'+id) as HTMLCollectionOf<HTMLElement>;
    // //let sideBack = document.getElementsByClassName('side-back') as HTMLCollectionOf<HTMLElement>;
    // for (var n=0; n<sideBack.length; n++) {
    //     sideBack[n].style.zIndex = '99';
    //     sideBack[n].style.visibility = 'visible';
    // }

    // sideFront[0].style.opacity = "0";
    // sideFront[0].style.visibility = "hidden";
    // sideFront[0].style.transition = "opacity 1s ease-in, visibility .75s linear";
  }

//   img() {
//     if ()
//   }

  render() {
      console.log(this.props.post.img);
      console.log(this.props);
      var postId = this.props.post.date;
      var imgArray = this.props.post.img.slice(2, -2).split('","');
      var date = (new Date(parseFloat(this.props.post.date))).toString();
      console.log(date);
      console.log(imgArray);
    return(
      <div className={'card-side side-front id'+postId} style={scrollStyle}>
        <i className="fa fa-commenting-o fa-2x comment-i" style={commentStyle} onClick={()=>this.flip(postId)}></i>
        <div className='container-fluid'>
          <div className='row'>

            <div className='col-xs-6 side-front-content' style={postContentStyle}>
              <b> {this.props.post.name} </b> 
              <small style={dateStyle}> &emsp; {date} </small>
              <p style={postMsgStyle}> {this.props.post.msg} </p>
            </div>

            <div className='col-xs-6' style={postImgStyle}>
                {imgArray.map((img:any, i:any) =>
                    <img key={i} src={img}/>
                )}
            </div>

            {/* <div className='col-xs-6 side-front-content' style={postMsgStyle}>
              <p> {this.props.post.msg} </p>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component<any,any> {

    flip = (id:any) => {
        let cardBody = document.querySelectorAll('div.card-container .id'+id) as HTMLCollectionOf<HTMLElement>;
        //let cardBody = document.getElementsByClassName('card-body') as HTMLCollectionOf<HTMLElement>;
        // for (var n=0; n<cardBody.length; n++) {
            cardBody[0].style.transform = "rotateY(360deg)";
            cardBody[1].style.zIndex = '1';
            cardBody[1].style.visibility = 'hidden';
    
            //cardBody[1].style.transform = "rotateY(180deg)";
            cardBody[2].style.zIndex = '99';
            cardBody[2].style.visibility = 'visible';
        ////////////////
        // let cardBody = document.querySelectorAll('div.card-body .id'+id) as HTMLCollectionOf<HTMLElement>;
        // // for (var n=0; n<cardBody.length; n++) {
        //     cardBody[0].style.transform = "rotateY(180deg)";
        //     cardBody[1].style.transform = "rotateY(0deg)";
        // //}
        // // let sideFront = document.getElementsByClassName('side-front') as HTMLCollectionOf<HTMLElement>;
        // // sideFront[0].style.zIndex = '99';
        // // sideFront[0].style.visibility = 'visible';
        // // let sideBack = document.getElementsByClassName('side-back') as HTMLCollectionOf<HTMLElement>;
        // // sideBack[0].style.zIndex = '1';
        // // sideBack[0].style.visibility = 'hidden';

        // let sideFront = document.querySelectorAll('div.side-front .id'+id) as HTMLCollectionOf<HTMLElement>;
        // //let sideFront = document.getElementsByClassName('side-front') as HTMLCollectionOf<HTMLElement>;
        // for (var n=0; n<sideFront.length; n++) {
        //     sideFront[n].style.zIndex = '99';
        //     sideFront[n].style.visibility = 'visible';
        // }    
    
        // let sideBack = document.querySelectorAll('div.side-back .id'+id) as HTMLCollectionOf<HTMLElement>;
        // //let sideBack = document.getElementsByClassName('side-back') as HTMLCollectionOf<HTMLElement>;
        // for (var n=0; n<sideBack.length; n++) {
        //     sideBack[n].style.zIndex = '1';
        //     sideBack[n].style.visibility = 'hidden';
        // }

    }

  render() {
      console.log(this.props);
      var postId = this.props.post.date;
    return(
      <div className={'card-side side-back id'+postId} style={scrollBackStyle}>
        <i className="fa fa-angle-double-right fa-2x comment-i" style={commentStyle} onClick={()=>this.flip(postId)}></i>
        <div className='container-fluid'>
          <h1>Let's get in touch!</h1>
          
          <form action='' className='card-form'>
            <div className='row'>
              <div className='col-xs-6'>
                <CardInput name='contactFirstName' id='contactFirstName' type='text' placeholder='Your first name' />
              </div>

              <div className='col-xs-6'>
                <CardInput name='contactLastName' id='contactLastName' type='text' placeholder='Your last name' />
              </div>
            </div>

            <div className='row'>
              <div className='col-xs-6'>
                <CardInput name='contactEmail' id='contactEmail' type='email' placeholder='Your email address' />
              </div>

              <div className='col-xs-6'>
                <CardInput name='contactSubject' id='contactSubject' type='text' placeholder='Subject' />
              </div>
            </div>
            
            <CardTextarea name='contactMessage' id='contactMessage' placeholder='Your message' />
            
            <CardBtn className='btn btn-primary' type='submit' value='Send message' />
          </form>
          
          <CardProfileLinks />
        </div>
      </div>
    )
  }
}

class ViewPostComponent extends React.Component<{ post: any },any> {
    state: any;

    componentDidMount() {
        console.log(this.state);
        console.log(this.props);
        // axios.post("http://localhost:8080/api/getpost", this.props
        //                 // , {
        //                 //     headers: { 'Access-Control-Allow-Origin': '*', "X-Requested-With": "XMLHttpRequest", 'Accept': 'application/json',
        //                 //     'Content-Type': 'application/json' },
        //                 //     }
        //             ).then((response:any) => {
        //                 this.setState({msg: response.data.values}, ()=> {
        //                     this.post = this.state.msg;
        //                 }); 
        //                 console.log(response.data.values);
        //             }) 
        //             .catch((error)=> console.log(error));     
        //             console.log(this.state);
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        //var postId = this.props.post.date;
        return (
            <div className={'card-container id'+this.props.post.date}>
            <div className={'card-body id'+this.props.post.date}>
                <CardBack post={this.props.post}/>
                <CardFront post={this.props.post}/>
            </div>
            </div>
        )
    }
  }

const mapStatetoProps = (state: any) => {
    console.log(state)
    return {
      ...state
    };
};

export default connect(mapStatetoProps, {})(ViewPostComponent);

