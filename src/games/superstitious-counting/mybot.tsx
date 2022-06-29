import { State } from 'boardgame.io';
import { Bot } from 'boardgame.io/ai';
import { BotAction } from 'boardgame.io/dist/types/src/ai/bot';
import { MyGameState } from './game';

class MyBot extends Bot {
    // waits 400 ms for UX
    async wait(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 400));
    }

    async play(state: State<MyGameState>, playerID: string): Promise<{ action: BotAction; metadata?: any; }> {
        await this.wait();
        // all numbers until 12 except the restricted
        let possible_moves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        // remove the restricted numbers
        possible_moves = possible_moves.filter(x => 13 - x !== state.G.restricted);
        // select random element
        const random_move = possible_moves[Math.floor(Math.random() * possible_moves.length)];
        return {
            action: {
                type: 'MAKE_MOVE',
                payload: {
                    type: 'increaseNumber',
                    args: [
                        random_move,
                    ],
                    playerID
                },
            },
        };
    }
}

export default MyBot;