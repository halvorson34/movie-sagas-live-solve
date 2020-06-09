import React, { Component } from "react";
import { connect } from "react-redux";

class DetailsPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_MOVIE",
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: "GET_MOVIE_GENRES",
      payload: this.props.match.params.id,
    });
  }

  clickBackToList = (event) => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="alignLeft">
        <h2>Details</h2>

        <div>
          <button onClick={this.clickBackToList}>Back to List</button>
          <button>Edit</button>
        </div>

        <h3>{this.props.store.details.title}</h3>
        <p>{this.props.store.details.description}</p>

        <ul>
          {this.props.store.genres.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(DetailsPage);
