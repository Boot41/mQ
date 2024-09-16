import React from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));

// Defer non-critical rendering
setTimeout(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}, 0);

// Lazy load reportWebVitals
if (process.env.NODE_ENV === 'production') {
  import('./reportWebVitals').then(({ default: reportWebVitals }) => {
    reportWebVitals(console.log);
  });
}
