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
        let possible_moves = this.enumerate(state.G, state.ctx, playerID);
        let randomIndex = Math.floor(Math.random() * possible_moves.length);
        return {action: possible_moves[randomIndex]};
    }
}

export default MyBot;