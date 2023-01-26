import {GameStatus, ViewState} from "../types";
import React, {useEffect, useState} from "react";
import {GameStatusBoard} from "./GameStatusBoard";
import {getGameStatus, startGame} from "../api";
import {useGameId, useUsername} from "../hook";
import {PlayerHand} from "./PlayerHand";
import {Deck} from "./Deck";
import {GameEvents} from "./GameEvents";

function StartGameFunc(props: { gameStatus: GameStatus | null}) {
    const {gameStatus} = props

    if (gameStatus == null) {
        return <></>
    }

    if (gameStatus.players.length >= 2 && gameStatus.rounds.length === 0) {
        return (
            <button className="bg-sky-500 hover:bg-sky-700"
                    onClick={() => {
                        startGame(gameStatus?.game_id).then((result) => {
                            console.log(`${gameStatus?.game_id} started? => ${result}`);
                        });
                    }
            }>
                開始遊戲
            </button>
        )
    }

    return <></>
}

export function GameRoom(props: { visitFunc: (view: ViewState) => void}) {
    const [gameStatus, setGameStatus] = useState<GameStatus | null>(null);
    const [username] = useUsername();
    const [gameId] = useGameId();


    // refresh GameStatus every 5 seconds.
    useEffect(() => {
        // set GameStatus before the refresher triggered
        getGameStatus(gameId, username).then((status: GameStatus) => {
            setGameStatus(status);
        });

        // const intervalId = setInterval(() => {
        //     // auto-refresh GameStatus
        //     getGameStatus(gameId, username).then((status: GameStatus) => {
        //         setGameStatus(status);
        //     });
        // }, 5 * 1000);
        //
        // return () => {
        //     clearInterval(intervalId);
        // };
    }, []);

    return (
        <>
            <div className="flex h-screen">
                <div className="w-[75vw] p-4 flex flex-col mx-auto">
                    <div className="flex flex-grow items-center justify-center">
                        <div className="flex h-[20vh]">
                            <PlayerHand index={2} gameStatus={gameStatus} />
                        </div>
                    </div>

                    <div className="flex flex-grow items-center justify-center">
                        <div className="flex h-[20vh]">
                            <PlayerHand index={3} gameStatus={gameStatus} />
                        </div>
                        <div className="flex h-[20vh] w-[300px] m-4 ml-16 mr-16">
                            <Deck></Deck>
                        </div>
                        <div className="flex h-[20vh]">
                            <PlayerHand index={1} gameStatus={gameStatus} />
                        </div>
                    </div>

                    <div className="flex flex-grow items-center justify-center">
                        <div className="flex h-[20vh]">
                            <PlayerHand index={0} gameStatus={gameStatus} />
                        </div>
                    </div>

                    <div className={"absolute right-1/4 m-4"}>
                        <StartGameFunc gameStatus={gameStatus}/>
                    </div>

                </div>

                {/*Game status*/}
                <div className="w-[25vw] p-4 border-l-2 border-slate-400 shadow-amber-300">
                    <GameStatusBoard gameStatus={gameStatus}/>
                    <GameEvents events={gameStatus?.events} />
                </div>
            </div>
        </>
    )
}