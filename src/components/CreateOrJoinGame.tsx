import {ViewState} from "@/types";
import {useGameId, useUsername} from "@/hook";
import {createGame, joinGame} from "@/api";
import React from "react";


export function CreateOrJoinGame(props: { visitFunc: (view: ViewState) => void }) {
    const [username, setUsername] = useUsername();
    const [gameId, setGameId] = useGameId()

    return (
        <div className="App h-screen justify-center items-center flex">
            <div
                className="w-[25vw] p-4 flex flex-col mx-auto border-2 border-black rounded-xl justify-center items-center"
            >
                <p>{username}</p>
                <span className="block text-sm font-medium text-slate-700">輸入玩家資訊：</span>
                <div className={"m-4"}>
                    <input type={"text"} placeholder="玩家名稱" className="border-2 m-2 border-black" onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                    <input type={"text"} placeholder="房間ID" className="border-2 m-2 border-black" onChange={(e) => {
                        setGameId(e.target.value)
                    }}/>
                </div>
                <div>
                    <button className={"border-2 mr-2 ml-2 border-black"} onClick={() => {
                        createGame(username).then((result) => {
                            if (result === null) {
                                alert("創建房間失敗");
                            } else {
                                console.log("roomId: ", result);
                                setGameId(result);
                                props.visitFunc("game-room")
                            }
                        });
                    }}>創建房間
                    </button>
                    <button className={"border-2 mr-2 ml-2 border-black"} onClick={() => {
                        joinGame(gameId, username).then((result) => {
                            if (result === null) {
                                alert("加入房間失敗");
                            } else {
                                console.log("join game: ", result);
                                props.visitFunc("game-room")
                            }
                        });
                    }}>加入房間
                    </button>
                </div>
            </div>
        </div>
    )
}

