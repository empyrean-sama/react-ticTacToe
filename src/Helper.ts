import ICard from "./interface/ICard";
import EGameState from "./enum/EGameState";
import ECardState from "./enum/ECardState";

/**
 * Given a board, check state of the game.
 * @param cards: all the cards on the board
 * @returns an enum indicating the state of this game
 */
export function checkGameOver(cards: Array<ICard>): EGameState {
    const winConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    for(let condition of winConditions) {
        const [a,b,c] = condition;
        if(cards[a].state !== ECardState.undefined && cards[b].state !== ECardState.undefined && cards[c].state !== ECardState.undefined && cards[a].state === cards[b].state && cards[b].state === cards[c].state) {
            if(cards[a].state === ECardState.circle) {
                return EGameState.oVictory;
            }
            else {
                return EGameState.xVictory;
            }
        }
    }
    if(cards.findIndex((card) => card.state === ECardState.undefined) === -1) {
        return EGameState.draw;
    }
    return EGameState.goingOn;
}