import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import {createBrowserHistory} from "history";
import logger from "redux-logger";
import DataRed from "./ReduxStore/DataReducer";
import UserRed from "./ReduxStore/UserReducer";

const store = createStore(
  combineReducers({
    DataRed: DataRed,
    // UserRed: UserRed,
  }),
  // composeWithDevTools()
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
