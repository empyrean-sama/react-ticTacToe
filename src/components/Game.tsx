import React, { cloneElement, createContext, useState } from "react";
import { checkGameOver } from '../Helper';

import _ from 'lodash';

import ICard, { getDefaultCards } from "../interface/ICard";
import TurnPane from "./Panes/TurnPane";
import BoardPane from "./Panes/BoardPane";
import HistoryPane from "./Panes/HistoryPane";
import IGameContext from "../interface/IGameContextAPI";
import ECardState from "../enum/ECardState";
import EGameState from "../enum/EGameState";

import Style from './Game.module.scss';

export const gameContext = createContext<IGameContext | undefined>(undefined);

export default function Game() {
    const [turns, setTurns] = useState<Array<Array<ICard>>>([getDefaultCards()]); // always place x's on odd turns

    function getCurrentTurnNumber(): number {
        return turns.length;
    }

    function setLastSelectedCardIndex(index: number) {
        if(index < 0 || index > 8) {
            throw new Error('index out of bounds!');
        }
    }

    function rewindBoardToTurn(turnNumber: number) {
        if(turnNumber >= 0 && turnNumber < turns.length) {
            const newTurns = turns.slice(0, turnNumber);
            setTurns(_.cloneDeep(newTurns));
        }
        else {
            throw new Error('incorrect turn number specified');
        }
    }

    function tryPlayTurn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const clickedCardSurface = e.target as HTMLDivElement;
        const clickedCardSurfaceIndex = parseInt(clickedCardSurface.dataset['index'] as string);

        if(turns[turns.length-1][clickedCardSurfaceIndex].state === ECardState.undefined) {
            const newCards = [...turns[turns.length-1]];
            newCards[clickedCardSurfaceIndex].state = ((turns.length % 2) === 0)? ECardState.circle : ECardState.cross; //todo: maybe implicitly don't decide here that player 1 is X and player 2 is O 
            
            const gameOver = checkGameOver(newCards);
            if(gameOver !== EGameState.goingOn) {
                if(gameOver === EGameState.draw) {
                    alert('draw')
                }
                else {
                    alert(gameOver + ' won');
                }
            }
            setTurns([...turns, [...newCards]]);
        }
    }

    function restartGame(): void {
        setTurns([getDefaultCards()]);
    }

    return (
        <gameContext.Provider value={{setLastSelectedCardIndex, tryPlayTurn, restartGame, rewindBoardToTurn, getCurrentTurnNumber}}>
            <div className={Style["game-pane"]}>
                <TurnPane />
                <BoardPane cards={turns[turns.length-1]} />
                <HistoryPane />
            </div>
        </gameContext.Provider>
    );
}