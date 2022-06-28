import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import TicTacToe from './TicTacToe/main';
import Coin123 from './coin123/main';

const root = document.getElementById('root');
render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/tictactoe" element={<TicTacToe/>} />
      <Route path="/coin123" element={<Coin123/>} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>, 
  root
); // HELP: Ide miért "<App />" kellet és nem "App"

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
