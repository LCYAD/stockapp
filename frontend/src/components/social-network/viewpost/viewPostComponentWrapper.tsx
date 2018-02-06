import * as React from 'react';
//import './main-part.css';
import ViewPostComponent from './viewPostComponent';
//import { connect } from 'react-redux';
//import { instruMatch } from '../../main-part/main-part';

export default class ViewPostComponentWrapper extends React.Component<any,any> {


    render() {   
  //      if (this.props.post!=null) {
        return this.props.post.payload.data.slice(0).reverse().map(( p: any) => {
                //console.log(p);
                return (
                    <div key={p.date}>
                        <ViewPostComponent post={p}/>
                    </div>
                );
                });
    //   }
    //   else {
    //     console.log('no'); 
    //     return (<div/>)
    //   };
    //   console.log('no');
    //   return (<div/>);
    }
  }

//   const mapStatetoProps = (state: any) => {
//     console.log(state);
//     return {
//       currentInstrument: state.currentInstrument,
//      // oandaInstrument: instruMatch[state.currentInstrument],
//       fetchData: state.fetchData,
//       user: state.user,
//       msg: state.msg
//     }
//   };

// export default connect(mapStatetoProps, {})(ViewPostComponentWrapper);