import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { BrowserRouter, } from 'react-router-dom';
import { CmsDataProvider,} from './utils/context/DataServiceContext';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CmsDataProvider>
        <App />
      </CmsDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);

