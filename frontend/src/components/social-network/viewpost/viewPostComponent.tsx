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

var commentStyle = {
    clear: 'both',
    float:'right', 
    marginTop: '15px'
}

var scrollStyle: React.CSSProperties = {
    disaply: 'inline-block',
    overflowY: 'auto',
    overflowX: 'auto'
}
// React component for the front side of the card
class CardFront extends React.Component<any,any> {
  render() {
    return(
      <div className='card-side side-front' style={scrollStyle}>
        <div /*className='container-fluid'*/style={scrollStyle}>
          <div className='row' style={scrollStyle}>
            <div className='col-xs-6'>
              <img src='https://source.unsplash.com/w8YICpz1I10/358x458' />
            </div>

            <div className='col-xs-6 side-front-content'>
              <p> Testing </p>
              <p> Testing </p>
              <p> Testing </p>
              <p> Testing </p>
              <p> Testing </p>
              <p> Testing </p>
              <p> Testing </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component<any,any> {
  render() {
    return(
      <div className='card-side side-back'>
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

class ViewPostComponent extends React.Component<any,any> {
    render() {
      return(
        <div className='card-container'>
          <div className='card-body'>
            <CardBack />
            <CardFront />
            <i className="fa fa-chevron-circle-right" style={commentStyle}></i>
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

