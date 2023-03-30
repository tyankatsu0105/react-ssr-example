import React from "react";
import { hydrateRoot } from "react-dom/client";

import App from "./components/App.jsx";

const container = document.getElementById("app");

/**
 * ここで、hydrateRoot() で React コンポーネントを HTML 要素に変換する
 */
hydrateRoot(container, <App />);
