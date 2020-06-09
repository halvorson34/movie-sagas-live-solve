import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";

import DetailsPage from "../pages/DetailsPage/DetailsPage";
import HomePage from "../pages/HomePage/HomePage";
import EditPage from "../pages/EditPage/EditPage";

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={HomePage} />
          <Route path="/details/:id" component={DetailsPage} />
          <Route path="/edit/:id" component={EditPage} />
        </Router>
      </div>
    );
  }
}

export default App;
