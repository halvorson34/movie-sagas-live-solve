import React, { Component } from "react";
import { connect } from "react-redux";

class DetailsPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_MOVIE",
      payload: this.props.match.params.id,
    });
  }

  clickBackToList = (event) => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h2>Details</h2>
        <button onClick={this.clickBackToList}>Back to List</button>
        <p>Selected ID is: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default connect()(DetailsPage);
