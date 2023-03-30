# server side rendering の流れ

## hidrate

1. ブラウザから `/` へリクエストが来る
2. `server.js` がリクエストを受け取る
3. `renderToString`で`App`をレンダリングした文字列を response として返す
4. response として返した文字列の中に `bundle.js`を request しているので、ブラウザが`bundle.js`を取得する
5. `bundle.js`中には`client.js`があるので、`client.js`が実行される
6. `client.js`で`hydrateRoot`しているので、3 の html 文字列を`hydrate`し、React のコンポーネントとして認識させる
   - ここで`hydrateRoot`していないと、renderToString で返された HTML は描画しているが、React コンポーネントとして認識されていないので、イベントが発火しない
     - 例えば useState で state を変更しても、画面が更新されない
     -

## redux hidrate

1. ブラウザから `/` へリクエストが来る
2. `server.js` がリクエストを受け取る
3. リクエストの内容によって state の値が変わるような処理が走る
4. `renderToString`で`App`をレンダリングした文字列を response として返す
   - 文字列中に、`window.__PRELOADED_STATE__`という変数に、現在の state の値が入った文字列を渡す
5. `client.js`で`hydrateRoot`するときに、`window.__PRELOADED_STATE__`を読み込んで、state の値を更新する
