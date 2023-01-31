import {GameStatus} from "@/types";
import {createContext, ReactNode, useEffect, useState} from "react";
import {useGameId, useUsername} from "@/hook";
import {getGameStatus} from "@/api";

export interface GameInformation {
    gameId: string;
    gameStatus: GameStatus | null;
    IsReady: () => boolean;
    GetUsername: () => string;
}

export const GameContext = createContext<GameInformation>({
    GetUsername(): string {
        return "";
    },
    IsReady(): boolean {
        return false;
    },
    gameId: "",
    gameStatus: null
});

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

        // const intervalId = setInterval(() => {
        //     // auto-refresh GameStatus
        //     getGameStatus(gameId, username).then((status: GameStatus) => {
        //         setGameStatus(status);
        //     });
        // }, 2 * 1000);
        //
        // return () => {
        //     clearInterval(intervalId);
        // };
    }, []);

    const value: GameInformation = {
        gameId,
        gameStatus,
        IsReady: () => {
            return gameStatus != null;
        },
        GetUsername: () => username,
    };

    return (
        <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
    )
}
