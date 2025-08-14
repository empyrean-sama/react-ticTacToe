import EGameState from "./enum/EGameState";
import ECardState from "./enum/ECardState";

/**
 * Given a board, check state of the game.
 * @param cards: all the cards on the board
 * @returns an enum indicating the state of this game
 */
export function checkGameState(cards: Array<ECardState>): EGameState {
    const winConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    for(let condition of winConditions) {
        const [a,b,c] = condition;
        if(cards[a] !== ECardState.undefined && cards[b] !== ECardState.undefined && cards[c] !== ECardState.undefined && cards[a] === cards[b] && cards[b] === cards[c]) {
            if(cards[a] === ECardState.circle) {
                return EGameState.circleVictory;
            }
            else {
                return EGameState.crossVictory;
            }
        }
    }
    if(cards.findIndex((card) => card === ECardState.undefined) === -1) {
        return EGameState.draw;
    }
    return EGameState.goingOn;
}