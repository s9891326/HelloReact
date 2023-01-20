import {GameStatus} from "../types";
import {useUsername} from "../hook";
import {CardBack} from "./Cards";

export function PlayerHand(props: {index: number, gameStatus: GameStatus | null}) {
    const [username] = useUsername()
    const { index, gameStatus } = props
    console.log(gameStatus);

    if (gameStatus == null) {
        return <CardBack enabled={false}/>;
    }

    if (gameStatus.players[index] === undefined) {
        return <CardBack enabled={false} />;
    }

    let playerName = "";
    if (gameStatus.rounds.length === 0) {
        playerName = gameStatus.players[index].name
    } else {
        playerName = gameStatus.players[index].name
    }

    const is_current_user = playerName === username;

    return (
        <div className="container relative">

            {/*// <!-- card -->*/}
            <div className="w-[118px] h-[172px] shadow-xl shadow-zinc-500">
                <img src="card-back.svg" alt="" className="bg-white rounded-xl"/>
            </div>
            {/*<div className="w-[118px] h-[172px] shadow-xl shadow-zinc-500 container relative">*/}
            {/*</div>*/}

            <div
                className={`text-xs rounded-xl bg-amber-100 p-2 font-bold ${
                    is_current_user ? "border-2 border-amber-500" : ""
                }`}
                style={{ position: "absolute", top: "-2.5rem", left: 5 }}
            >
                {playerName}
            </div>
        </div>
    )
}