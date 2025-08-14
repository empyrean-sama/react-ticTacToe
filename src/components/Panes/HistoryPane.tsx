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

    for(let i=1; i<9; i++) {
        turnButtons.push(<Button key={'rewind-key-'+i} onClick={() => gameContextAPI.rewindBoardToTurn(i)} disabled={currentTurnNumber <= (i)} size="medium" variant="contained">Turn {i}</Button>)
    }

    return (
        <div className={Style['history-pane']}>
            <Button onClick={gameContextAPI.restartGame} variant="outlined" startIcon={<VscDebugRestart />}>Restart Game</Button>
            <Card>
                <CardContent className={Style['rewind-pane']}>
                    <Typography component="h2" variant="h5">Rewind To Turn</Typography>
                    <div className={Style['turn-bin']}>
                        {turnButtons}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}