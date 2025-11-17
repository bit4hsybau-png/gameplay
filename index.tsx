import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');

if (!rootElement) {
  // Log an explicit error if the mount node is missing.
  // Throwing here can make some setups show only a white screen with no console hint.
  // eslint-disable-next-line no-console
  console.error('Root element with id="root" not found. Ensure index.html contains <div id="root"></div>.');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
