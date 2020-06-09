import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//SAGAS for API calls

//SAGA GETs all movies from server API and sends to movies reducer
function* getAllMovies() {
  try {
    const response = yield axios.get("/api/movies");
    yield put({
      type: "SET_MOVIES",
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
}

function* getMovie(action) {
  try {
    const movieId = action.payload;
    const response = yield axios.get(`/api/movies/details/${movieId}`);
    yield put({
      type: "SET_DETAILS",
      payload: response.data[0],
    });
  } catch (err) {
    console.warn(err);
  }
}

// Create the rootSaga generator function
function* rootSaga() {
  yield takeLatest("GET_ALL_MOVIES", getAllMovies);
  yield takeLatest("GET_MOVIE", getMovie);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

const details = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
