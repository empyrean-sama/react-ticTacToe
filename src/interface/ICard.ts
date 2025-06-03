import ECardState from "../enum/ECardState";

export default interface ICard {
    index: number
    state: ECardState;
}

export function getDefaultCards(): Array<ICard> {
    const cards: Array<ICard> = []
    for(let i=0; i<9; i++) {
        cards.push({state: ECardState.undefined, index: i});
    }
    return cards;
}