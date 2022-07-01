import { INVALID_MOVE } from 'boardgame.io/core';
import type { Game } from "boardgame.io";

export interface MyGameState {
  cells: Array<null | string>;
}

export const MyGame : Game<MyGameState> = {
    name: "tic-tac-toe",
    minPlayers: 2,
    maxPlayers: 2,

    setup: () => ({ cells: Array(9).fill(null) }),

    turn: {
        minMoves: 1,
        maxMoves: 1,
      },

    moves: {
        clickCell: ({G, ctx, playerID},cellID:number) => {
            if (G.cells[cellID] !== null) {
              return INVALID_MOVE;
            }
            G.cells[cellID] = ctx.currentPlayer;
          }
        },

    endIf: ({G, ctx, playerID}) => {
        if (IsVictory(G.cells)) {
            return { winner: ctx.currentPlayer };
        }
        if (IsDraw(G.cells)) {
            return { draw: true };
        }
        },

    ai: {
        enumerate: (G, ctx, playerID) => {
            let moves = [];
            for (let i = 0; i < 9; i++) {
              if (G.cells[i] === null) {
                  moves.push({ move: 'clickCell', args: [i] });
              }
            }
            return moves;
        },
    },
};

  // Return true if `cells` is in a winning configuration.
function IsVictory(cells : Array<null | string>) {
    const positions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
  
    const isRowComplete = (row : number[]) => {
      const symbols = row.map(i => cells[i]);
      return symbols.every(i => i !== null && i === symbols[0]);
    };

    return positions.map(isRowComplete).some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells : Array<null | string>) {
    return cells.filter(c => c === null).length === 0;
}
