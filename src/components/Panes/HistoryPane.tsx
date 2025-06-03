import React, { useContext } from "react";
import Style from './HistoryPane.module.scss';

import { VscDebugRestart } from "react-icons/vsc";
import { Card, Button, CardActionArea, CardContent, IconButton, Typography, ButtonGroup } from "@mui/material";
import { gameContext } from "../Game";
import IGameContextAPI from "../../interface/IGameContextAPI";

export default function HistoryPane() {
    const turnButtons: Array<any> = [];
    const gameContextAPI = useContext(gameContext) as IGameContextAPI;

    const currentTurnNumber = gameContextAPI.getCurrentTurnNumber();

    for(let i=0; i<9; i++) {
        turnButtons.push(<Button key={'rewind-key-'+i} onClick={() => gameContextAPI.rewindBoardToTurn(i+1)} disabled={currentTurnNumber <= (i + 1)} size="medium" variant="contained">Turn {i+1}</Button>)
    }

    return (
        <div className={Style['history-pane']}>
            <Card className={Style['restart-label']}>
                <IconButton aria-label="delete" size="large">
                    <VscDebugRestart fontSize={64} color="black" onClick={gameContextAPI.restartGame} />
                </IconButton>
                <Typography component="span" variant="h5">Restart Game</Typography>
            </Card>
            <Card className={Style['rewind-pane']}>
                <CardContent>
                    <Typography component="h5" variant="h5">Rewind To Turn</Typography>
                    <div className={Style['turn-bin']}>
                        {turnButtons}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}