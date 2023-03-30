import React from "react";
import { hydrateRoot } from "react-dom/client";

import App from "./components/App.jsx";
import { Provider } from "react-redux";
import { reducer } from "./components/store.js";
import { createStore } from "redux";

const store = createStore(reducer, window.__PRELOADED_STATE__);
const container = document.getElementById("app");
delete window.__PRELOADED_STATE__;

/**
 * ここで、hydrateRoot() で React コンポーネントを HTML 要素に変換する
 */
hydrateRoot(
  container,
  <Provider store={store}>
    <App />
  </Provider>
);
