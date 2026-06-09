import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Board from "./App";

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Board />
    </StrictMode>
  );
} else {
  console.error("Could not find the root element in index.html");
}