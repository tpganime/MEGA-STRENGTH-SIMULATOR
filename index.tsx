import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

const clearLoader = () => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 500);
  }
};

if (!rootElement) {
  console.error("FATAL: #root element missing in DOM");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    // Remove loader once React has control
    clearLoader();
  } catch (err) {
    console.error("React rendering error:", err);
    clearLoader();
  }
}