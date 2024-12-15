import { GameHelper } from './gameHelper.js';

const run = async () => {
  const numberOfHands = Number(GameHelper.getValueFromArgs('numberOfHands') || 3);
  const numberOfRounds = Number(GameHelper.getValueFromArgs('numberOfRounds') || 2);

  const player1Type = GameHelper.getValueFromArgs(`player1Type`) || (await GameHelper.choosePlayerType('Choose player 1 type'));
  const player2Type = GameHelper.getValueFromArgs(`player2Type`) || (await GameHelper.choosePlayerType('Choose player 2 type'));

console.log(numberOfHands, numberOfRounds, player1Type, player2Type);
  const game = await startGame(player1Type, player2Type, numberOfRounds, numberOfHands);
  console.log('Thanks for playing! Goodbye.');
};

const startGame = async (player1Type, player2Type, numberOfRounds, numberOfHands) => {
  let player1 = GameHelper.playerType(player1Type);
  let player2 = GameHelper.playerType(player2Type);


  let p1TotalScore = 0;
  let p2TotalScore = 0;

  for (let index = 0; index < numberOfRounds; index++) {
    console.log(`Round ${index + 1}/${numberOfRounds}:`);
    const p1Hands = await player1.getHands(numberOfHands);
    const p2Hands = await player2.getHands(numberOfHands);

    const { p1Score, p2Score } = GameHelper.determineRoundWinner(p1Hands, p2Hands);
    p1TotalScore += p1Score;
    p2TotalScore += p2Score;

    console.log(`Round ${index + 1} result:`);
    GameHelper.announceWinner(p1Score, p2Score);
  }
  console.log(`Final score: Player 1: ${p1TotalScore}, Player 2: ${p2TotalScore}`);
  GameHelper.announceWinner(p1TotalScore, p2TotalScore);
}

run();