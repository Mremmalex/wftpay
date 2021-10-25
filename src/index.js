import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis"
import 'bootstrap/dist/css/bootstrap.min.css';
import {TEST_APP_ID, TEST_SERVER_URL} from "./config.json"

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={TEST_APP_ID} serverUrl={TEST_SERVER_URL}>
    <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
