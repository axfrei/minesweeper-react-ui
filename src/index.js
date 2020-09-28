import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BeginForm from './App';
import * as serviceWorker from './serviceWorker';
import UserHome from './UserHome'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Game from './Game'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
          <Route exact={true} path="/" component={BeginForm}/>
          <Route exact={true} path="/minesweeper" component={UserHome} />
          <Route path="/minesweeper/game/:gameId" component={Game} />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
