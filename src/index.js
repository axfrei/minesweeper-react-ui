import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BeginForm from './App';
import * as serviceWorker from './serviceWorker';
import UserHome from './UserHome'
import { BrowserRouter, Route } from 'react-router-dom'
import Game from './Game'

ReactDOM.render(
  <React.StrictMode>
    <div>
    <p>DISCLAIMER: This is my first time making an application with React, therefore I am aware that there is much to improve and refactor. Don't spect a fancy UI,
      this was only taked as a personal challenge to learn (at least a little) a new technology and also to test my Minesweeper API.
      I hope you could still appreciate it despite being a bit rustic
    </p>
    </div>
    <BrowserRouter>
          <Route exact={true} path="/" component={BeginForm}/>
          <Route exact={true} path="/minesweeper" component={UserHome} />
          <Route path="/minesweeper/game/:gameId" component={Game} />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
