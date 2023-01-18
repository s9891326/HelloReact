import {GameStatus, ViewState} from "../types";
import React, {useEffect, useState} from "react";
import {GameStatusBoard} from "./GameStatusBoard";
import {getGameStatus} from "../api";
import {useGameId, useUsername} from "../hook";

export function GameRoom(props: { visitFunc: (view: ViewState) => void}) {
    const [gameStatus, setGameStatus] = useState<GameStatus | null>(null);
    const [username] = useUsername();
    const [gameId] = useGameId();


    // refresh GameStatus every 5 seconds.
    useEffect(() => {
        // set GameStatus before the refresher triggered
        getGameStatus(gameId, username).then((status: GameStatus) => {
            setGameStatus(status);
            console.log(gameStatus);
        });

        // const intervalId = setInterval(() => {
        //     // auto-refresh GameStatus
        //     getGameStatus(gameId, username).then((status: GameStatus) => {
        //         setGameStatus(status);
        //     });
        // }, 5 * 1000);

        // return () => {
        //     getGameStatus(gameId, username).then((status: GameStatus) => {
        //         console.log("statue: ", status)
        //         setGameStatus(status);
        //         console.log(gameStatus);
        //     });
        //     // clearInterval(intervalId);
        // };
    }, []);

    return (
        <>
            {/*Game status*/}
            <div className="w-[25vw] p-4 border-l-2 border-slate-400 shadow-amber-300">
                <GameStatusBoard gameStatus={gameStatus}/>
            </div>
        </>
    )
}