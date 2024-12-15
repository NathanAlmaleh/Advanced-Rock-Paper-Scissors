import { GameHelper } from '../gameHelper.js';

export interface PlayerInterface {
  getHands: (numberOfHands: number) => Promise<string[]>;
  hands: string[];
}
export class HumanPlayer implements PlayerInterface {
  hands: string[] = [];
  async getHands(numberOfHands: number) {
    this.hands = [];
    for (let index = 0; index < numberOfHands; index++) {
      const hand = await GameHelper.chooseHand(`Choose hand (${index + 1}/${numberOfHands})`)
      this.hands.push(hand);
    }
    return this.hands;
  };
}
