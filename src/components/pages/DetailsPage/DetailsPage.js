import React, { Component } from "react";

class DetailsPage extends Component {
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

export default DetailsPage;
