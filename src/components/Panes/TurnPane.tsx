import React, { useContext } from "react";
import Style from './TurnPane.module.scss';
import { Card, CardContent, Typography } from "@mui/material";
import { gameContext } from "../Game";
import IGameContextAPI from "../../interface/IGameContextAPI";
import EGameState from "../../enum/EGameState";

import { MdOutlineSportsScore } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

export default function TurnPane() {

    const gameContextAPI = useContext(gameContext) as IGameContextAPI;
    
    // Set instructional text and icon based on game state
    let title = `Turn ${gameContextAPI.getCurrentTurnNumber()}`
    let instructionalText = "Will play now.";
    let instructionalIcon: React.ReactElement  = gameContextAPI.getIconInPlay();
    const gameState = gameContextAPI.getGameState();
    switch(gameState) {
        case EGameState.draw:
            title = "Finish";
            instructionalText = "Game ended in draw.";
            instructionalIcon = <MdOutlineSportsScore size={64} />
            break;
        case EGameState.circleVictory:
            title = "Finish";
            instructionalText = "Has Won!";
            instructionalIcon = <FaRegCircle size={64} />
            break;
        case EGameState.crossVictory:
            title = "Finish";
            instructionalText = "Has Won!";
            instructionalIcon = <ImCross size={64} />
            break;
        case EGameState.goingOn:
            break;
        default:
            throw new Error('invalid game state received in TurnPane, gameState: '+gameState);
    }

    return (
        <div className={Style["turn-pane"]}>
            <Card className={Style["turn-pane-card"]}>
                <CardContent className={Style["turn-pane-card-content"]}>
                    <Typography variant="h5" component="h2" className={Style["turn-number-type"]}>{title}</Typography>
                    {instructionalIcon}
                    <Typography variant="h6" component="h2" className={Style["type"]}>{instructionalText}</Typography>
                </CardContent>
            </Card>
        </div>
    );
}