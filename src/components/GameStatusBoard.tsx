import {GameStatus} from "../types";


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

export function  GameStatusBoard(props: {gameStatus: GameStatus | null}) {
    const { gameStatus } = props;
    let gameProgress = "...(未知)...";

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
        }
    }

    return (
        <>
            {gameStatus?.game_id}
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
        </>
    );
}