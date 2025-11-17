import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  // Don't throw — log a helpful error so it's visible in the console.
  // A thrown error can result in a blank page without a clear message in some setups.
  // This makes it easier to debug when the HTML file is missing the mount node.
  // eslint-disable-next-line no-console
  console.error('Root element with id="root" not found. Ensure index.html contains <div id="root"></div>.');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
