import React, { createContext, useState } from "react";
import { checkGameOver } from '../Helper';

import ICard, { getDefaultCards } from "../interface/ICard";
import TurnPane from "./Panes/TurnPane";
import BoardPane from "./Panes/BoardPane";
import HistoryPane from "./Panes/HistoryPane";
import IGameContext from "../interface/IGameContextAPI";
import ECardState from "../enum/ECardState";
import EGameState from "../enum/EGameState";

export const gameContext = createContext<IGameContext | undefined>(undefined);

export default function Game() {
    const [cards, setCards] = useState<Array<ICard>>(getDefaultCards());
    const [lastSelectedCardIndexState, setLastSelectedCardIndexState] = useState<number>(Number.NaN);
    const [turns, setTurns] = useState<Array<Array<ICard>>>([getDefaultCards()]); // always place x's on odd turns

    function setLastSelectedCardIndex(index: number) {
        if(index < 0 || index > 8) {
            throw new Error('index out of bounds!');
        }
        setLastSelectedCardIndexState(index);
    }

    function rewindBoardToTurn(turnNumber: number) {
        if(turnNumber >= 0 && turnNumber < turns.length) {
            const newTurns = turns.slice(0, turnNumber + 1);
            setTurns(newTurns);
            setCards(newTurns[newTurns.length - 1]);
        }
        else {
            throw new Error('incorrect turn number specified');
        }
    }

    function tryPlayTurn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const clickedCardSurface = e.target as HTMLDivElement;
        const clickedCardSurfaceIndex = parseInt(clickedCardSurface.dataset['index'] as string);

        if(cards[clickedCardSurfaceIndex].state === ECardState.undefined) {
            const newCards = [...cards];
            newCards[clickedCardSurfaceIndex].state = ((turns.length % 2) === 0)? ECardState.circle : ECardState.cross; //todo: maybe implicitly don't decide here that player 1 is X and player 2 is O 
            setCards(newCards);
            setLastSelectedCardIndex(clickedCardSurfaceIndex);

            const gameOver = checkGameOver(newCards);
            if(gameOver !== EGameState.goingOn) {
                if(gameOver === EGameState.draw) {
                    alert('draw')
                }
                else {
                    alert(gameOver + ' won');
                }
            }
            else {
                setTurns([...turns, [...newCards]]);
            }
        }
    }

    function restartGame(): void {
        setCards(getDefaultCards());
        setTurns([getDefaultCards()]);
        setLastSelectedCardIndex(Number.NaN);
    }

    return (
        <gameContext.Provider value={{lastSelectedCardIndexState, setLastSelectedCardIndex, tryPlayTurn, restartGame, rewindBoardToTurn}}>
            <div className="flex">
                <TurnPane />
                <BoardPane cards={cards} />
                <HistoryPane />
            </div>
        </gameContext.Provider>
    );
}