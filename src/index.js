import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/signup_process';
import { Provider } from 'react-redux';
import store from './store/store';
import { StyledEngineProvider } from '@mui/material/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
          </MuiPickersUtilsProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

