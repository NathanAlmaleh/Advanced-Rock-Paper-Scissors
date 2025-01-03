import inquirer from "inquirer";
import { CpuPlayer, MonkeyPlayer } from "./players/cpuPlayer.js";
import { HumanPlayer, PlayerInterface } from "./players/humanPlayer.js";
import { EHandType, EPlayerType } from "./consts/enumType.js";
export class GameHelper {

  static async choosePlayerType(message: string) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message,
        choices: [EPlayerType.HUMAN, EPlayerType.CPU],
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
        choices: [EHandType.ROCK, EHandType.PAPER, EHandType.SCISSORS],
      },
    ]);
    return answer.choice;
  }

  static determineRoundWinner(p1Hands: string[], p2Hands: string[]) {
    console.log('hands',p1Hands, p2Hands);
    let [p1Score, p2Score] = [0, 0];

    for (let i = 0; i < p1Hands.length; i++) {
      const p1Hand = p1Hands[i];
      const p2Hand = p2Hands[i];

      if (p1Hand === p2Hand) continue; // It's a tie for this round

      if (
        (p1Hand === EHandType.ROCK && p2Hand === EHandType.SCISSORS) ||
        (p1Hand === EHandType.SCISSORS && p2Hand === EHandType.PAPER) ||
        (p1Hand === EHandType.PAPER && p2Hand === EHandType.ROCK)
      ) {
        p1Score++;
      } else {
        p2Score++;
      }
    }

    return { p1Score, p2Score };
  }

  static announceWinner(p1Score: number, p2Score: number): void {
    if (p1Score > p2Score) {
      console.log("Player 1 wins the game!");
    } else if (p2Score > p1Score) {
      console.log("Player 2 wins the game!");
    } else {
      console.log("The game is a tie!");
    }
  }

  static playerType = (stType: string): PlayerInterface => {
    switch (stType) {
      case EPlayerType.MONKEY:
        return new MonkeyPlayer();
      case EPlayerType.HUMAN:
        return new HumanPlayer();
      case EPlayerType.CPU:
        return new CpuPlayer();
      default:
        throw new Error(`Unsupported player type: ${stType}`);
    }
  };
  

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