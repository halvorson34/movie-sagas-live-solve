import React, { Component } from "react";
import { connect } from "react-redux";

class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_ALL_MOVIES",
    });
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
}

export default connect()(HomePage);
