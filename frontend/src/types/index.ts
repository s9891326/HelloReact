import {GameEvent} from "@/types/event";
import {NamedPlayer, Round} from "@/types/game";

export type ViewState = "pick-name" | "game-list" | "game-room";

export interface GameStatus {
    game_id: string;
    players: Array<NamedPlayer>;
    rounds: Array<Round>;
    events: Array<GameEvent>;
}

export * from "./event";
export * from "./game";