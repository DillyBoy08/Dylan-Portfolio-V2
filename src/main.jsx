import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Always start at the top — prevent browser scroll restoration on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
