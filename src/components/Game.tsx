import React, {createContext, useState} from "react";
import Style from './Game.module.scss';

import { checkGameState } from '../Helper';

import TurnPane from "./Panes/TurnPane";
import BoardPane from "./Panes/BoardPane";
import HistoryPane from "./Panes/HistoryPane";

import IGameContext from "../interface/IGameContextAPI";
import ECardState from "../enum/ECardState";
import EGameState from "../enum/EGameState";
import { FaRegCircle } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

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
    const [aiPlaying, setAiPlaying] = useState<boolean>(false);
    
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

    function getIconInPlay(): React.ReactElement {
        const turnNumber = getCurrentTurnNumber();
        return (turnNumber % 2 === 0)? <ImCross size={64} /> : <FaRegCircle size={64} />
    }

    function getGameState(): EGameState {
        const latestTurnCloned = [...(turns[turns.length-1])];
        return checkGameState(latestTurnCloned);
    }

    return (
        <gameContext.Provider value={{playTurn, restartGame, rewindBoardToTurn, getCurrentTurnNumber, getIconInPlay, getGameState}}>
            <Backdrop sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} open={aiPlaying}>
                <div className={Style['backdrop-container']}>
                    <Typography color="white" variant="h5" component="h1">AI is playing...</Typography>
                    <CircularProgress color="primary" />
                </div>
            </Backdrop>
            <div className={Style["game-pane"]}>
                <TurnPane />
                <BoardPane cards={turns[turns.length-1]} />
                <HistoryPane />
            </div>
        </gameContext.Provider>
    );
}