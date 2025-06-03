export default interface IGameContextAPI {
    lastSelectedCardIndexState: number;
    setLastSelectedCardIndex(n: number);
    restartGame(): void,
    tryPlayTurn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
    rewindBoardToTurn(turnNumber?: number): void
}