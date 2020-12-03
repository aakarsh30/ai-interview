import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Grommet} from 'grommet';
import {
  BrowserRouter ,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Recorder from './component/videorecorder';
ReactDOM.render(
  <React.StrictMode>
    <Grommet full>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact >
            <App />
          </Route>
          <Route path="/rec" >
            <Recorder />
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
