import {GameStatus, TurnPlayer} from "@/types";
import {createContext, ReactNode, useEffect, useState} from "react";
import {useGameId, useUsername} from "@/hook";
import {getGameStatus} from "@/api";

export interface GameInformation {
    GameId: () => string;
    GameStatus: () => GameStatus;
    IsReady: () => boolean;
    GetUsername: () => string;
    GetTurnPlayer: () => TurnPlayer;
    GetStartPlayer: () => string;
    IsMyTurn: () => boolean;
}

class BeforeReadyGameInformation implements GameInformation {
    unknown = "<unknown>";

    GetTurnPlayer(): TurnPlayer {
        return {cards: [], name: "unknown", out: false};
    }

    GetStartPlayer(): string {
        return this.unknown;
    }

    GetUsername(): string {
        return this.unknown;
    }

    IsReady(): boolean {
        return false;
    }

    GameId(): string {
        return this.unknown;
    }

    GameStatus(): GameStatus {
        return {events: [], game_id: "", players: [], rounds: []};
    }

    IsMyTurn(): boolean {
        return false;
    }
}

class ConcreteGameInformation implements GameInformation {
    constructor(gameId: string, username: string, gameStatus: GameStatus) {
        this.gameId = gameId;
        this.username = username;
        this.gameStatus = gameStatus;
    }

    GetStartPlayer(): string {
        if (this.gameStatus.rounds.length === 0) {
            return "unknown";
        }
        return this.gameStatus.rounds[this.gameStatus.rounds.length - 1].start_player;
    }

    GetTurnPlayer(): TurnPlayer {
        if (this.gameStatus.rounds.length === 0) {
            return {cards: [], name: "unknown", out: false};
        }
        return this.gameStatus.rounds[this.gameStatus.rounds.length - 1].turn_player;
    }

    GetUsername(): string {
        return this.username;
    }

    IsReady(): boolean {
        return this.gameStatus != null;
    }

    GameId(): string {
        return this.gameId;
    }

    GameStatus(): GameStatus {
        return this.gameStatus;
    }

    IsMyTurn(): boolean {
        return this.GetTurnPlayer().name === this.username;
    }

    gameId: string;
    username: string;
    gameStatus: GameStatus;
}

export const GameContext = createContext<GameInformation>(
    new BeforeReadyGameInformation()
);

interface GameDataProviderProps {
    children: ReactNode
}

export function GameDataProvider(props: GameDataProviderProps) {
    const [gameId] = useGameId();
    const [username] = useUsername();
    const [gameStatus, setGameStatus] = useState<GameStatus | null>(null);

    // refresh GameStatus every 5 seconds.
    useEffect(() => {
        // set GameStatus before the refresher triggered
        getGameStatus(gameId, username).then((status: GameStatus) => {
            setGameStatus(status);
        });

        const intervalId = setInterval(() => {
            // auto-refresh GameStatus
            getGameStatus(gameId, username).then((status: GameStatus) => {
                setGameStatus(status);
            });
        }, 2 * 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    let value: GameInformation = new BeforeReadyGameInformation();
    if (gameStatus !== null) {
        value = new ConcreteGameInformation(gameId, username, gameStatus);
    }

    return (
        <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
    )
}
