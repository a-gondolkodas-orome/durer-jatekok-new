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
  const onClick = (id : number) => moves.clickCell(id);
  let winner = getWinner(ctx);

  const cellStyle = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  };

  return (
    <main>
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
    </main>
  );
}
