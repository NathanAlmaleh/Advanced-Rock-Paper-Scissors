import {HumanPlayer} from "./humanPlayer.js";
import { GameHelper } from '../gameHelper.js';

export class CpuPlayer extends HumanPlayer{
    constructor(){
        super();
    }

    getHands = async (numberOfHands: number) => {
        for (let index = 0; index < numberOfHands; index++) {
            const randomNumber = Math.floor(Math.random() * 3);
            const randomHand = ['Rock', 'Paper', 'Scissors'][randomNumber];
            this.hands.push(randomHand);
        }
    
        return this.hands;
      };

}