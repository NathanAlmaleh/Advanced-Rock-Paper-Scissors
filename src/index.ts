import { GameHelper } from './gameHelper.js';
import { GameController } from './gameController.js';

const run = async () => {
  const numberOfHands = Number(GameHelper.getValueFromArgs('numberOfHands') || 3);
  const numberOfRounds = Number(GameHelper.getValueFromArgs('numberOfRounds') || 2);

  const player1Type = GameHelper.getValueFromArgs(`player1Type`) || (await GameHelper.choosePlayerType('Choose player 1 type'));
  const player2Type = GameHelper.getValueFromArgs(`player2Type`) || (await GameHelper.choosePlayerType('Choose player 2 type'));

  const ControlerGame = new GameController(GameHelper.playerType(player1Type), GameHelper.playerType(player2Type), numberOfRounds, numberOfHands);
  await ControlerGame.startGame();
  // const game = await startGame(player1Type, player2Type, numberOfRounds, numberOfHands);
  console.log('Thanks for playing! Goodbye.');
};

const startGame = async (player1Type: string, player2Type: string, numberOfRounds: number, numberOfHands: number) => {
  let player1 = GameHelper.playerType(player1Type);
  let player2 = GameHelper.playerType(player2Type);


  let p1TotalScore = 0;
  let p2TotalScore = 0;

  for (let index = 0; index < numberOfRounds; index++) {
    console.log(`Round ${index + 1}/${numberOfRounds}:`);
    const p1Hands = await player1.getHands(numberOfHands);
    const p2Hands = await player2.getHands(numberOfHands);

    const { p1Score, p2Score } = GameHelper.determineRoundWinner(p1Hands, p2Hands);
    
    p1Score > p2Score ? p1TotalScore++ : p2TotalScore++; // increase winner round

    console.log(`Round ${index + 1} result:`);
    GameHelper.announceWinner(p1Score, p2Score);
  }
  console.log(`Final score: Player 1: ${p1TotalScore}, Player 2: ${p2TotalScore}`);
  GameHelper.announceWinner(p1TotalScore, p2TotalScore);
}

run();