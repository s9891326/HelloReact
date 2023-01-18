import {ViewState} from "../types";
import React, {useState} from "react";
import {useGameId, useUsername} from "../hook";
import {createGame} from "../api";

export function CreateOrJoinGame(props: { visitFunc: (view: ViewState) => void }) {
    const [username, setUsername] = useUsername();
    const [gameId, setGameId] = useGameId()

    return (
        <div className="App h-screen justify-center items-center flex">
            <div
                className="w-[25vw] p-4 flex flex-col mx-auto border-2 border-black rounded-xl justify-center items-center"
            >
                <p>{username}</p>
                <label className={"m-4"}>
                    <span className="block text-sm font-medium text-slate-700">輸入玩家名稱：</span>
                    <input type={"text"} placeholder="玩家名稱" className="border-2 border-black" onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </label>
                <div className="border-2 border-black items-center mx-auto">
                    <button onClick={() => {
                        createGame(username).then((result) => {
                            if (result === null) {
                                alert("eeeeee");
                            } else {
                                // props.visitFunc("game-list")
                                console.log("roomId: ", result);
                                setGameId(result);
                                props.visitFunc("game-room")
                            }
                        });
                    }}>創建房間
                    </button>
                </div>
            </div>
        </div>
    )
}
