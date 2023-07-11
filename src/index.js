import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from './context/bankistContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const el = document.getElementById('root')
const root = ReactDOM.createRoot(el);

root.render(
  <div>
    <ToastContainer />
    <Provider>
      <App />
    </Provider>
  </div >
);
