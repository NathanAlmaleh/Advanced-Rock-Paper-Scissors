import inquirer from "inquirer";
import { CpuPlayer } from "./players/cpuPlayer.js";
import { HumanPlayer } from "./players/humanPlayer.js";

export class GameHelper {

static async choosePlayerType(message: string) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message,
        choices: ['Human', 'Cpu'],
      },
    ]);
    return answer.choice;
  }

  static async chooseHand(message: string) {
    const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message,
          choices: ['Rock', 'Paper', 'Scissors'],
        },
      ]);
    return answer.choice;
  }

  static determineRoundWinner(p1Hands: string[], p2Hands: string[]) {
    let [p1Score, p2Score] = [0, 0];

    for (let i = 0; i < p1Hands.length; i++) {
      const p1Hand = p1Hands[i];
      const p2Hand = p2Hands[i];

      if (p1Hand === p2Hand) continue; // It's a tie for this round

      if (
        (p1Hand === 'Rock' && p2Hand === 'Scissors') ||
        (p1Hand === 'Scissors' && p2Hand === 'Paper') ||
        (p1Hand === 'Paper' && p2Hand === 'Rock')
      ) {
        p1Score++; // Player 1 wins this round
      } else {
        p2Score++; // Player 2 wins this round
      }
    }

    return { p1Score, p2Score }; // Return the scores for both players
  }

  static announceWinner(p1Score: number, p2Score: number):void{
    if (p1Score > p2Score) {
      console.log("Player 1 wins the game!");
    } else if (p2Score > p1Score) {
      console.log("Player 2 wins the game!");
    } else {
      console.log("The game is a tie!");
    }
  }

  static playerType = (stType:String) =>{
      return stType === 'Cpu' ? new CpuPlayer() : new HumanPlayer();
  }

  static getValueFromArgs(argName: string) {
    // Find the argument in process.argv in the format '--key=value'
    const argPattern = new RegExp(`^${argName}=(.*)$`);
    const arg = process.argv.find((arg) => argPattern.test(arg));

    // If the argument is found, return its value (after the '=' sign), otherwise return null
    if (arg) {
      return arg.match(argPattern)?.[1] || null;
    }
    return null;
  }

}