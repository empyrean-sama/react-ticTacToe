import React from "react";
import Style from './App.module.scss';

import NavBar from "./NavBar";
import Game from "./Game";

export default function App() {
    return (
        <div className={Style.app}>
            <NavBar />
            <Game />
        </div>
    );
}