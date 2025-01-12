import React from 'react';
import ReactDOM from 'react-dom/client';

function MyComponent() {
  return (
    <h1>Hello, React!</h1>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyComponent />);