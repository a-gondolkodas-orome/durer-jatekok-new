import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
    <Link to="/tictactoe">Tic Tac Toe</Link><br/>
    <Link to="/superstitious-counting">Coin123</Link><br/>
    <Link to="/lobby">Lobby (needs running server: <pre>npm run dev:server</pre></Link><br/>
    </div>
  );
}

export default App;
