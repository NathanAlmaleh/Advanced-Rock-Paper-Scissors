import { HumanPlayer } from "./humanPlayer.js";
import { EHandType } from "../consts/enumHand.js";

export class CpuPlayer extends HumanPlayer {
    constructor() {
        super();
    }

    async getHands(numberOfHands: number): Promise<string[]> {

        // monkey player only one random selection use super class for selection other hands
        if (this instanceof MonkeyPlayer) {
            super.getHands(numberOfHands - 1);
            this.hands.push(CpuPlayer.randomHand());
            return this.hands;
        }
        //noraml cpu player all random hands
        for (let index = 0; index < numberOfHands; index++) {
            this.hands.push(CpuPlayer.randomHand());
        }
        return this.hands;
    };

    static randomHand(): string {
        const randomNumber = Math.floor(Math.random() * 3);
        const randomHand = [EHandType.ROCK, EHandType.PAPER, EHandType.SCISSORS][randomNumber];
        return randomHand
    }

}

export class MonkeyPlayer extends CpuPlayer {
    constructor() {
        super();
    }
}