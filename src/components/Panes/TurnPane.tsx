import React from "react";
import Style from './TurnPane.module.scss';
import { Typography } from "@mui/material";

export default function TurnPane() {
    return (
        <div className={Style["turn-pane"]}>
            <Typography>Turn Pane</Typography>
        </div>
    );
}