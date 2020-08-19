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

  clickSaveMovieDetails = (event) => {
    let newDetails = {
      ...this.state,
      id: this.props.match.params.id,
    };

    if (newDetails.title == null || newDetails.title === "") {
      newDetails.title = this.props.store.details.title;
    }

    if (newDetails.description == null || newDetails.description === "") {
      newDetails.description = this.props.store.description.title;
    }

    this.props.dispatch({
      type: "PUT_MOVIE",
      payload: newDetails,
    });
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div className="alignLeft">
        <h2>Edit</h2>
        <div>
          <button onClick={this.clickCancel}>Cancel</button>
          <button onClick={this.clickSaveMovieDetails}>Save</button>
        </div>

        <div>
          <div>
            <input
              type="text"
              placeholder="New Title"
              onChange={this.changeMovieDetails("title")}
              defaultValue={this.props.store.details.title}
            />
          </div>

          <div>
            <textarea
              onChange={this.changeMovieDetails("description")}
              defaultValue={this.props.store.details.description}
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
