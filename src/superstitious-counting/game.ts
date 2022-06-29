import { Game } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

export interface MyGameState {
  current: number;
  target: number;
  restricted: null | number;
}

export const MyGame : Game<MyGameState> = {
    setup: () => ({ current: 0, target: 100, restricted: null }), // TODO: Random

    turn: {
        minMoves: 1,
        maxMoves: 1,
      },

    moves: {
        increaseNumber: ({G, ctx, playerID}, numberToAdd) => {
            if (!Array.from(Array(12).keys()).map(x => x+1).includes(numberToAdd)
            || G.restricted == numberToAdd) {
              return INVALID_MOVE;
            }
            G.current = G.current + numberToAdd;
            G.restricted = 13 - numberToAdd;
          }
        },

    endIf: ({G, ctx, playerID}) => {
        if (G.target <= G.current) {
            return { loser: ctx.currentPlayer };
        }
        },

    ai: {
        enumerate: (G, ctx, playerID) => {
          let moves = [];
          for (let i = 1; i <= 12; i++) {
            if (G.restricted === null || 13-G.restricted !== i) {
              moves.push({ move: 'increaseNumber', args: [i] });
            }
          }
          return moves
        },
    },
};
