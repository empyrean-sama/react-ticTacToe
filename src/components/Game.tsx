import React, {createContext, useState} from "react";
import Style from './Game.module.scss';

import { checkGameState } from '../Helper';

import TurnPane from "./Panes/TurnPane";
import BoardPane from "./Panes/BoardPane";
import HistoryPane from "./Panes/HistoryPane";

import IGameContext from "../interface/IGameContextAPI";
import ECardState from "../enum/ECardState";
import EGameState from "../enum/EGameState";

export const gameContext = createContext<IGameContext | undefined>(undefined);

function getStartingBoard(): Array<ECardState> {
    const boardState: Array<ECardState> = [];
    for(let i=0; i<9; i++) {
        boardState.push(ECardState.undefined);
    }
    return boardState;
}

export default function Game() {
    const [turns, setTurns] = useState<Array<Array<ECardState>>>([getStartingBoard()]); // always place x's on odd turns
    
    function restartGame(): undefined {
        setTurns([getStartingBoard()]);
    }

    function getCurrentTurnNumber(): number {
        return turns.length;
    }

    function rewindBoardToTurn(turnNumber: number): undefined {
        if(turnNumber < 0 || turnNumber > 9) {
            throw new Error('trying to rewind to invalid turn number');
        }
        const newTurns = turns.slice(0, turnNumber + 1).map((turn) => [...turn]);
        setTurns(newTurns);
    }

    function playTurn(clickedCardIndex: number): undefined {
        const turnNumber = getCurrentTurnNumber();
        const latestTurnCloned = [...(turns[turns.length-1])];
        
        if(latestTurnCloned[clickedCardIndex] === ECardState.undefined) {
            latestTurnCloned[clickedCardIndex] = (turnNumber % 2 === 0)? ECardState.cross : ECardState.circle;

            // try to see if the game is over
            const gameState = checkGameState(latestTurnCloned);
            if(gameState !== EGameState.goingOn) {
                alert(gameState);
            }

            // register the turn recently played
            const clonedTurns = [...turns].map((turn) => [...turn]);
            setTurns([...clonedTurns, latestTurnCloned]);
        }
    }

    return (
        <gameContext.Provider value={{playTurn, restartGame, rewindBoardToTurn, getCurrentTurnNumber}}>
            <div className={Style["game-pane"]}>
                <TurnPane />
                <BoardPane cards={turns[turns.length-1]} />
                <HistoryPane />
            </div>
        </gameContext.Provider>
    );
}