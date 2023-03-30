import React from "react";
import ReactDomServer from "react-dom/server";
import qs from "qs";
import express from "express";
import browserify from "browserify";
import babelify from "babelify";
import App from "./components/App.jsx";
import { Provider } from "react-redux";
import { reducer } from "./components/store.js";
import { createStore } from "redux";
const app = express();
const port = 3000;

const renderFullPage = (content, preloadedState) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>React SSR Example</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    </head>
    <body>
      <div>jjjjjjjjjjjjjjjjjjj</div>
      <div id="app">${content}</div>
      <script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // https://redux.js.org/usage/server-rendering#security-considerations
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        "\\u003c"
      )}
    </script>
      <script src="bundle.js"></script>
    </body>
  </html>
  `;
};

app.get("/bundle.js", (req, res) => {
  browserify("./client.js", { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(res);
});

app.get("/", (req, res) => {
  const params = qs.parse(req.query);
  const count = parseInt(params.count, 10) || 0;

  /**
   * http://localhost:3000/?count=100
   * window.__PRELOADED_STATE__でpreloadedStateをclientに渡さないと、hydrateしたときにstoreが初期化されて、server sideでstateが変更された値がクライアントに引き継げない
   */
  const preloadedState = { count };

  const store = createStore(reducer, preloadedState);

  const component = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  /**
   * ここで、ReactDomServer.renderToString() で React コンポーネントを HTML 文字列に変換する
   */
  const content = ReactDomServer.renderToString(component);

  const finalState = store.getState();

  res.send(renderFullPage(content, finalState));
  console.info("rendered at server side");
});

app.listen(port, () => {
  console.info(
    "==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.",
    port,
    port
  );
});
