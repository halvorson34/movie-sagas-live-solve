import React, { Component } from "react";
import { connect } from "react-redux";

class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_ALL_MOVIES",
    });
  }

  clickMovieDetails = (event, id) => {
    this.props.history.push(`/details/${id}`);
  };

  render() {
    return (
      <div>
        <h2>Home</h2>
        {this.props.store.movies.map((item, index) => (
          <div
            key={index}
            className="movieListItem"
            onClick={(event) => this.clickMovieDetails(event, item.id)}
          >
            <img src={item.poster} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(HomePage);
