import React from "react";
import { useDispatch, useSelector } from "react-redux";

export function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = React.useCallback(() => setCount((c) => c + 1), []);

  const dispatch = useDispatch();
  const incrementByAction = () => {
    dispatch({ type: "INCREMENT" });
  };
  const decrementByAction = () => {
    dispatch({ type: "DECREMENT" });
  };
  const storeCount = useSelector((state) => state.count);
  return (
    <div>
      <button onClick={increment}>useState increment</button>
      <p>count: {count}</p>

      <button onClick={incrementByAction}>redux store increment</button>
      <button onClick={decrementByAction}>redux store decrement</button>
      <p>count: {storeCount}</p>
    </div>
  );
}
