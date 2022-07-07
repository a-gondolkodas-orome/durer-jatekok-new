import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import botWrapper from './botwrapper';
import { Game } from 'boardgame.io';
import { TurnOrder } from 'boardgame.io/core';


export default function MyClient(game: any, board: any, strategy: any) { // TODO types
	return Client({
		game: MyGame(game),
		board: board,
		multiplayer: Local(
			{
				bots: { '1': botWrapper(strategy) }
			}
		),
		numPlayers: 2,
	})
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

function MyGame(game: any): Game<any> { // TODO: solve types
	return {
		setup: () => ({ ...game.setup(), firstPlayer: null, difficulty: null, winner: null }),

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
				moves: { ...game.moves },
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
		ai: game.ai
	};
};
