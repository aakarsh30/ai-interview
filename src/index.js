import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Thank from './component/thank';
import {Grommet} from 'grommet';

const themes ={
  anchor: {
    hover: {
      textDecoration: 'none',
    },
  },
  button: {
    active: {
      border: {
        color: 'black',
      },
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={themes} full>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <App />
          </Route>
          <Route path="/thank" >
            <Thank />
          </Route>
        </Switch>
      </BrowserRouter>
              
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
