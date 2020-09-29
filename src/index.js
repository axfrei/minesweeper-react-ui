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
