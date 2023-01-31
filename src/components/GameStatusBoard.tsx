import {Seen} from "@/types/game";
import {useContext} from "react";
import {GameContext} from "@/providers";


function PlayerItem(props: {name: string, index: number}) {
    const {name, index} = props
    if (name === "-") {
        return (
            <div className="bg-gray-400 m-4 p-2 min-h-[3rem] pl-3 rounded-xl flex items-center">
                玩家{index}：-
            </div>
        )
    }

    return (
        <div className="bg-gray-200 m-4 p-2 min-h-[3rem] pl-3 rounded-xl flex items-center">
            玩家{index}：{name}
        </div>
    )
}

export function  GameStatusBoard() {
    const context = useContext(GameContext)
    if (!context.IsReady()) {
        return <></>
    }

    const gameStatus = context.GameStatus();
    const username = context.GetUsername();

    let gameProgress = "...(未知)...";
    let seens: Array<Seen> = [];

    const data = [
        { name: "-", index: 1 },
        { name: "-", index: 2 },
        { name: "-", index: 3 },
        { name: "-", index: 4 },
    ];

    if (gameStatus != null) {
        gameStatus.players.map((p, idx) => {
            data[idx] = {name: p.name, index: idx + 1}
        });

        if (gameStatus.rounds.length === 0) {
            gameProgress = "等待玩家加入中...";
            if (gameStatus.players.length >= 2) {
                gameProgress = "等待遊戲開始...";
            }
        }

        // the game has started
        if (gameStatus.rounds.length > 0) {
            const currentRound = gameStatus.rounds[gameStatus.rounds.length - 1];
            gameProgress = `等待 ${currentRound.turn_player.name} 出牌~`;

            currentRound.players.map((p) => {
                if (p.name === username) {
                    seens = p.seen_cards;
                }
            });
        }
    }

    return (
        <>
            <div className="mb-5">
                <h1>遊戲狀態</h1>
                <div className="bg-gray-300 m-4 p-2 min-h-[3rem] pl-3 rounded-xl flex items-center">
                    {gameProgress}
                </div>
                <h1>玩家列表</h1>
                {data.map((x) => (
                    <PlayerItem name={x.name} index={x.index} />
                ))}
            </div>
            <div className="absolute top-2 left-2 border-2 border-black p-1 text-[10pt]">
                <div>玩家資訊</div>
                <div>gameId: {gameStatus?.game_id}</div>
                <div>
                    看到的牌：
                    {seens.map((x) => (
                        <SeenItem seen={x} />
                    ))}
                </div>
            </div>
        </>
    );
}

export function SeenItem(props: { seen: Seen }) {
    const { seen } = props;
    return (
        <>
            <div className="text-gray-600">
                看到 {seen.opponent_name} 持有 {seen.card.name}
            </div>
        </>
    );
}
