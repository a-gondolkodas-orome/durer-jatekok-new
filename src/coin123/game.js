import { INVALID_MOVE } from 'boardgame.io/core';

export const Game = {
    setup: () => ({ current: 0, target: 100, restricted: null }), // TODO: Random

    turn: {
        minMoves: 1,
        maxMoves: 1,
      },

    moves: {
        increaseNumber: ({G, ctx, playerID}, numberToAdd) => {
            if (G.restricted == numberToAdd) {
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
        enumerate: ({G, ctx, playerID}) => {
          console.log("what",G)
            let moves = [{
              move: 'increaseNumber',
              args: [...Array(13).keys()].filter((x) => x != 13-G.restricted)
            }];
            console.log(moves)
            return moves;
        },
    },
};
