import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/Helpers/GlobalStyles';
import { Provider } from 'react-redux';
import store from './ReduxService/store';
import { SocketContext,socket } from './SocketService';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <SocketContext.Provider value={socket}>
        <Provider store={store}>
          <App />
        </Provider>
      </SocketContext.Provider>
    </GlobalStyles>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
