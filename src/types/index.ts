export type ViewState = "pick-name" | "game-list" | "game-room";

interface NamedPlayer {
    name: string;
}

export interface GameStatus {
    game_id: string;
    players: Array<NamedPlayer>;
    rounds: [];
}
