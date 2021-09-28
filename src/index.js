import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/signup_process';
import { Provider } from 'react-redux';
import store from './store/store';
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>

          <App />

      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

