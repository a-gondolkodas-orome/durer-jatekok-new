import { State } from 'boardgame.io';
import { Bot } from 'boardgame.io/ai';
import { BotAction } from 'boardgame.io/dist/types/src/ai/bot';
import { MyGameState } from './game';

class MyBot extends Bot {
    THREE_IN_A_ROWS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // checks if the player can win
    checkRow(cells: (string|null)[], cell1: number, cell2: number, cell3: number, playerID: string): null|number {
        const c1 = cells[cell1];
        const c2 = cells[cell2];
        const c3 = cells[cell3];
        if (c1 === playerID && c2 === playerID && c3 === null) return cell3;
        if (c1 === playerID && c3 === playerID && c2 === null) return cell2;
        if (c2 === playerID && c3 === playerID && c1 === null) return cell1;
        return null;
    }

    // waits 400 ms for UX
    async wait(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 400));
    }

    async play(state: State<MyGameState>, playerID: string): Promise<{ action: BotAction; metadata?: any; }> {
        await this.wait();
        //const state : State<MyGameState> = _state as State<MyGameState>;
        const cells = state.G.cells;
        // check if player can win
        for (const row of this.THREE_IN_A_ROWS) {
            const result = this.checkRow(cells, row[0], row[1], row[2], playerID);
            if (result !== null) {
                console.debug("I've found it!");
                return {action: {
                    type: 'MAKE_MOVE',
                    payload: {
                        type: 'clickCell',
                        args: [
                            [result],
                        ],
                        playerID
                    },
                }};
            }
        }
        // check if enemy could win
        for (const row of this.THREE_IN_A_ROWS) {
            const result = this.checkRow(cells, row[0], row[1], row[2], playerID === '0' ? '1' : '0');
            if (result !== null) {
                console.debug("I won't let you!");
                return {action: {
                    type: 'MAKE_MOVE',
                    payload: {
                        type: 'clickCell',
                        args: [
                            [result],
                        ],
                        playerID
                    },
                }};
            }
        }
        let possible_moves = this.enumerate(state.G, state.ctx, playerID);
        let randomIndex = Math.floor(Math.random() * possible_moves.length);
        return {action: possible_moves[randomIndex]};
    }
}

export default MyBot;