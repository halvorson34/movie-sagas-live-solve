import React, { Component } from "react";
import { connect } from "react-redux";

class EditPage extends Component {
  state = {
    title: "",
    description: "",
  };

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

  changeMovieDetails = (fieldKey) => (event) => {
    this.setState({
      [fieldKey]: event.target.value,
    });
  };

  clickCancel = (event) => {
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div>
        <h2>Edit</h2>
        <p>Selected ID: {this.props.match.params.id}</p>

        <div>
          <button onClick={this.clickCancel}>Cancel</button>
          <button>Save</button>
        </div>

        <div>
          <div>
            <input
              type="text"
              placeholder="New Title"
              onChange={this.changeMovieDetails("title")}
            />
          </div>

          <div>
            <textarea
              onChange={this.changeMovieDetails("description")}
            ></textarea>
          </div>
        </div>

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

export default connect(mapStoreToProps)(EditPage);
