import { PlayerInterface } from './players/humanPlayer.js'
import { GameHelper } from './gameHelper.js';
export class GameController {

    numberOfRounds: number = 2;
    numberOfHands: number = 3;
    totalScore: number[] = [0,0];
    playerArray: PlayerInterface[];

    constructor(player1: PlayerInterface, player2: PlayerInterface, numberOfRounds: number, numberOfHands: number) {
        this.playerArray = [player1, player2];
        this.numberOfRounds = numberOfRounds;
        this.numberOfHands = numberOfHands;
    }
    async startGame(): Promise<void> {

        for (let index = 0; index < this.numberOfRounds; index++) {
            console.log(`Round ${index + 1}/${this.numberOfRounds}:`);
            const p1Hands = await this.playerArray[0].getHands(this.numberOfHands);
            const p2Hands = await this.playerArray[1].getHands(this.numberOfHands);
        
            const { p1Score, p2Score } = GameHelper.determineRoundWinner(p1Hands, p2Hands);
        
            p1Score > p2Score ? this.totalScore[0]++ : this.totalScore[1]++;
        
            console.log(`Round ${index + 1} result:`);
            GameHelper.announceWinner(this.totalScore[0], this.totalScore[1]);
          }

    }
}