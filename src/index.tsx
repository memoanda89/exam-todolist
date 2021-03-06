import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// context
import { GlobalProvider } from 'context/GlobalContext';

// stores
import store from 'stores';

// i18n
import 'locales/i18n';


// components
import App from './App';

// styles
import './index.css';
import reportWebVitals from './reportWebVitals';

 
const storeInstance = store;
ReactDOM.render(
  <Provider store={storeInstance}>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
