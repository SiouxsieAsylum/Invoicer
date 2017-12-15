import React, { Component } from 'react';
import Container from './components/container'
import Toolbar from './components/toolbar'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      auth: false,
      user: {}
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  // user auth fetchs

   login(){
    fetch('/api/auth/google',{
      credentials:'include',
      Accept:'application/json'
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        auth: true,
        user: json.data
      })
    })
    .catch(err => err)
  }

   logout(){
    fetch('/api/auth/logout',{
      credentials:'include',
      origin:''
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        auth: false,
        user: {}
      })
    })
    .catch(err => err)
  }

  render() {
    return (
      <div className="App">
        <Toolbar
          user={this.state.user}
          auth={this.state.auth}
          login={this.login}
          logout={this.logout}
          />
        <Container
          user={this.state.user}
          auth={this.state.auth}
          />
      </div>
    );
  }
}

export default App;
