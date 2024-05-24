import { createRoot } from 'react-dom/client';
import App from './components/App';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';


const container = document.getElementById('root');
if (!container) {
  throw new Error("Root container not found");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
  </React.StrictMode>
);