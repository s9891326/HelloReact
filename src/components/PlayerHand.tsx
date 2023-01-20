import {GameStatus, HandCard} from "../types";
import {useUsername} from "../hook";
import {CardBack, CardFront} from "./Cards";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

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

    const isCurrentUser = playerName === username;
    const currentRound = gameStatus.rounds[gameStatus.rounds.length - 1];
    let isTurnPlayer = false;
    if (currentRound) {
        isTurnPlayer = currentRound.turn_player.name === playerName;
    }
    console.log(isTurnPlayer, isCurrentUser, "username: " + username, "playerName: " + playerName);

    let handCards: Array<HandCard> = [];
    if (currentRound) {
        currentRound.players.forEach((p) => {
            if (p.name === playerName) {
                handCards = p.cards;
            }
        })
    }

    return (
        <div className="container relative">
            {/* 遊戲開始後，顯示玩家卡片資訊 */}
            {/* 如果是當前玩家，不是畫面要呈現的玩家，顯示2張卡牌背面 */}
            {isTurnPlayer && !isCurrentUser && (
                <div className="flex shadow-xl shadow-zinc-500">
                    <CardBack enabled={true}></CardBack>
                    <CardBack enabled={true}></CardBack>
                </div>
            )}

            {/* 如果是當前玩家，是畫面要呈現的玩家，顯示2張卡牌正面 */}
            {isTurnPlayer && isCurrentUser && (
                <div className={"flex"}>
                    {handCards.map((card) => (
                        <CardFront key={`${card.name}${playerName}`} handCard={card}></CardFront>
                    ))}
                </div>
            )}

            {/* 如果不是當前玩家，也不是畫面要呈現的玩家，顯示1張卡牌背面 */}
            {!isTurnPlayer && !isCurrentUser && (
                <div className="flex shadow-xl shadow-zinc-500">
                    <CardBack enabled={true}></CardBack>
                </div>
            )}

            {/* 如果不是當前玩家，是畫面要呈現的玩家，顯示1張卡牌正面 */}
            {!isTurnPlayer && isCurrentUser && (
                <CardFront handCard={handCards[0]}></CardFront>
            )}

            <div
                className={`text-xs rounded-xl bg-amber-100 p-2 font-bold ${
                    isCurrentUser ? "border-2 border-amber-500" : ""
                }`}
                style={{ position: "absolute", top: "-2.5rem", left: 5 }}
            >
                {playerName}
            </div>
        </div>
    )
}