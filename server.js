import React from "react";
import ReactDomServer from "react-dom/server";

import express from "express";
import browserify from "browserify";
import babelify from "babelify";
import App from "./components/App.jsx";

const app = express();
const port = 3000;

app.get("/bundle.js", (req, res) => {
  browserify("./client.js", { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(res);
});

app.get("/", (req, res) => {
  const component = <App />;

  /**
   * ここで、ReactDomServer.renderToString() で React コンポーネントを HTML 文字列に変換する
   */
  const content = ReactDomServer.renderToString(component);
  console.log({ content });

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>
        <div>jjjjjjjjjjjjjjjjjjj</div>
        <div id="app">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);
  console.info("rendered at server side");
});

app.listen(port, () => {
  console.info(
    "==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.",
    port,
    port
  );
});
