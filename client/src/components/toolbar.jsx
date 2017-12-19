import React, { Component } from 'react';
// import { Link } from

const NoUser = (props) => {
  return(
    <div id="toolbar">
      <div id="left"><h2>Invoice</h2></div>
      <div id="right"><p onClick={props.login}>Login with Google</p></div>
    </div>
    )
}

const User = (props) => {
  return(
    <div id="toolbar">
      <div id="left"><h2>Invoice</h2></div>
      <div id="right"><p>{props.user.email}</p><p>Send Mail</p><p onClick={props.logout}>Logout</p></div>
    </div>
    )
}

class Toolbar extends Component{
  constructor(props){
    super(props)
  }

  render(){
    // console.log(this.props.user.email)
    return(!this.props.user.email ?  <NoUser login={this.props.login}/> : <User user={this.props.user} logout={this.props.logout}/> )
  }
}

export default Toolbar;
