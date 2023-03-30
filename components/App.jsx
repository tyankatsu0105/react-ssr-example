import React from "react";

function App() {
  const [count, setCount] = React.useState(0);
  const increment = React.useCallback(() => setCount((c) => c + 1), []);
  return (
    <div>
      <button onClick={increment}>increment</button>
      <p>count: {count}</p>
    </div>
  );
}

export default App;
