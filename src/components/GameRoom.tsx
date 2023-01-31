import {GameStatus, ViewState} from "@/types";
import React, {useContext} from "react";
import {getGameStatus, startGame} from "@/api";
import {PlayerHand, Deck, GameEvents, GameStatusBoard} from "@/components";
import {GameContext} from "@/providers";

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
    const context = useContext(GameContext);
    if (!context.IsReady()) {
        return <></>;
    }

    const gameStatus = context.GameStatus();

    return (
        <>
            <div className="flex h-screen">
                <div className="w-[75vw] p-4 flex flex-col mx-auto">
                    <div className="flex flex-grow items-center justify-center">
                        <div className="flex h-[20vh]">
                            <PlayerHand index={2} />
                        </div>
                    </div>

                    <div className="flex flex-grow items-center justify-center">
                        <div className="flex h-[20vh]">
                            <PlayerHand index={3} />
                        </div>
                        <div className="flex h-[20vh] w-[300px] m-4 ml-16 mr-16">
                            <Deck></Deck>
                        </div>
                        <div className="flex h-[20vh]">
                            <PlayerHand index={1} />
                        </div>
                    </div>

                    <div className="flex flex-grow items-center justify-center">
                        <div className="flex h-[20vh]">
                            <PlayerHand index={0} />
                        </div>
                    </div>

                    <div className={"absolute right-1/4 m-4"}>
                        <StartGameFunc gameStatus={gameStatus}/>
                    </div>

                </div>

                {/*Game status*/}
                <div className="w-[25vw] p-4 border-l-2 border-slate-400 shadow-amber-300">
                    <GameStatusBoard />
                    <GameEvents />
                </div>
            </div>
        </>
    )
}