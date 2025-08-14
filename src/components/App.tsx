import React, { createContext, useState } from "react";
import Style from './App.module.scss';

import NavBar from "./NavBar";
import Game from "./Game";
import IAppContextAPI from "../interface/IAppContextAPI";

export const appContext = createContext<IAppContextAPI | undefined>(undefined);

export default function App() {

    // these switches are useful to control ai usage inside the application
    const [aiAvailable, setAiAvailable] = useState<boolean>(true);
    const [useAi, setUseAi] = useState<boolean>(false);

    function canAIBeUsed(): boolean {
        return !aiAvailable;
    }

    function shouldAIBeUsed(): boolean {
        return aiAvailable && useAi;
    }

    return (
        <div className={Style.app}>
            <appContext.Provider value={{shouldAIBeUsed, canAIBeUsed}}>
                <NavBar setUseAi={setUseAi} useAi={useAi} />
                <div className={Style["flex-100-container"]}>
                    <Game />
                </div>    
            </appContext.Provider>
        </div>
    );
}