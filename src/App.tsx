import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
    <Link to="/tictactoe">Tic Tac Toe</Link><br/>
    <Link to="/superstitious-counting">Coin123</Link><br/>
    </div>
  );
}

export default App;
