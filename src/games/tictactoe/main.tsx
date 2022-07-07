import { MyGame } from './game';
import { MyBoard } from './board';
import MyClient from '../../common/myclient';
import strategy from './strategy';

const TicTacToe = MyClient(MyGame,MyBoard,strategy);

export default function() {
  return (
    <>
      <TicTacToe playerID='0' />
    </>
  );
};