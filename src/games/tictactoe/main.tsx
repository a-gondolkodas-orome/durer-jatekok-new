import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { MyGame } from './game';
import { MyBoard } from './board';
import strategy from './strategy';
import botWrapper from '../../common/botwrapper';
import { State } from 'boardgame.io';

const TicTacToe = Client({
    game: MyGame,
    board: MyBoard,
    multiplayer: Local(
        {
          bots: { '1': botWrapper("clickCell",strategy) }
        }
      ),
    numPlayers: 2,

});

export default function() {
    function lulz() {
        let client = new TicTacToe({});
        
        let flow = client.client.game.flow;
        let state = { G: {}, ctx: flow.ctx(2)} as State;
        console.log(state);
        state = flow.init(state);
        console.log(state);
        }
        //lulz();
  return (
    <>
      <TicTacToe playerID='0' />
    </>
  );
};