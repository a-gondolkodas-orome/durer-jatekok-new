import { INVALID_MOVE, TurnOrder } from 'boardgame.io/core';
import type { Game } from "boardgame.io";

export interface MyGameState {
	cells: Array<null | string>;
	firstPlayer: number | null;
	difficulty: string | null;
	winner: string | null;
}


function chooseNewGameType({ G, ctx, playerID }: any, difficulty: string) { // TODO: type
	G.difficulty = difficulty;
	G.cells = Array(9).fill(null);
	G.firstPlayer = null;
	G.winner = null;
}

function chooseRole({ G, ctx, playerID }: any, firstPlayer: string) { // TODO: type
	G.firstPlayer = firstPlayer;
}

export const MyGame: Game<MyGameState> = {
	setup: () => ({ cells: Array(9).fill(null), firstPlayer: null, difficulty: null, winner: null }),

	turn: {
		minMoves: 1,
		maxMoves: 1,
	},
	phases: {
		startNewGame: {
			moves: { chooseNewGameType },
			endIf: ({ G, ctx, playerID }) => { return G.difficulty !== null },
			next: "chooseRole",
			turn: { order: TurnOrder.RESET },
			start: true,
		},
		chooseRole: {
			moves: { chooseRole },
			endIf: ({ G, ctx, playerID }) => { return G.firstPlayer !== null },
			next: "play",
			turn: { order: TurnOrder.RESET }
		},
		play: {
			moves: {
				clickCell: ({ G, ctx, playerID }, cellID: number) => {
					if (G.cells[cellID] !== null) {
						return INVALID_MOVE;
					}
					G.cells[cellID] = ctx.currentPlayer;

					if (IsVictory(G.cells)) {
						console.log(G)
						G.winner = ctx.currentPlayer;
						G.difficulty = null;
					} else if (IsDraw(G.cells)) {
						console.log(G)
						G.winner = "draw";
						G.difficulty = null;
					}
				},
			},
			endIf: ({ G, ctx, playerID }) => { return G.winner !== null; },
			next: "startNewGame",
			turn: {
				order: {
					first: ({ G, ctx }) => G.firstPlayer === 0 ? 0 : 1,
					next: ({ G, ctx }) => {
						console.log(G, ctx)
						return (ctx.playOrderPos + 1) % ctx.numPlayers
					},
				},
				endIf: ({ G, ctx, playerID }) => true,
			},
		},
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
function IsVictory(cells: Array<null | string>) {
	const positions = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
		[1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
	];

	const isRowComplete = (row: number[]) => {
		const symbols = row.map(i => cells[i]);
		return symbols.every(i => i !== null && i === symbols[0]);
	};

	return positions.map(isRowComplete).some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells: Array<null | string>) {
	return cells.filter(c => c === null).length === 0;
}

