import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App.jsx'; // explicit extension is fine

const container = document.getElementById('root');
if (!container) {
  document.body.innerHTML = '<pre style="color:red">Error: #root element not found in index.html</pre>';
  throw new Error('No #root element found');
}

try {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('App mounted');
} catch (err) {
  container.innerHTML = `<pre style="color:red; white-space:pre-wrap">${String(err)}</pre>`;
  console.error(err);
}
