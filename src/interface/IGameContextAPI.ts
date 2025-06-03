export default interface IGameContextAPI {
    setLastSelectedCardIndex(n: number): void,
    restartGame(): void,
    tryPlayTurn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
    rewindBoardToTurn(turnNumber?: number): void,
    getCurrentTurnNumber(): number
}