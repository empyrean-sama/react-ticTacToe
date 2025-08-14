export default interface IGameContextAPI {
    restartGame(): undefined,
    playTurn(clickedCardIndex: number): undefined,
    rewindBoardToTurn(turnNumber: number): undefined,
    getCurrentTurnNumber(): number,
}