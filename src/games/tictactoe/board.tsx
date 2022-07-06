import { MyGameState } from './game';
import { BoardProps } from 'boardgame.io/react';
import { Ctx } from 'boardgame.io';

interface MyGameProps extends BoardProps<MyGameState> {}

const getWinner = (ctx: Ctx): string | null => {
  if (!ctx.gameover) return null;
  if (ctx.gameover.draw) return 'Draw';
  return `Player ${ctx.gameover.winner} wins!`;
};

export function MyBoard({ G, ctx, moves } : MyGameProps) {
  let winner = getWinner(ctx);

  return (
    <div>
      <h1>boardgame.io Typescript Demo</h1>

      <div
        style={{
          display: 'grid',
          gridTemplate: 'repeat(3, 3rem) / repeat(3, 3rem)',
          gridGap: '0.3em',
        }}
      >
        {G.cells.map((cell, index) => (
          <button
            key={index}
            onClick={() => moves.clickCell(index)}
            disabled={cell !== null}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && <p>{winner}</p>}
    </div>
  );
}
