import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Host from './pages/host'
import Join from './pages/join'
import Navbar from "react-bootstrap/Navbar";
import Home from "./pages/home";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }


  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (
        <Router>
          <Navbar bg="dark">
            <Navbar.Brand style={{color: "white"}}>Buzz in app</Navbar.Brand>
          </Navbar>
          <Switch style={{margin: "25px"}}>
            <Route exact path="/" component={Home}></Route>
            <Route path="/host" component={Host}></Route>
            <Route path="/join" component={Join}></Route>
          </Switch>
        </Router>
    );
  }
}


export default App;
