export type ViewState = "pick-name" | "game-list" | "game-room";

interface NamedPlayer {
    name: string;
}

interface CardUsage {
    can_discard: boolean;
    can_guess_cards: Array<string>;
    choose_players: Array<string>;
}

export interface HandCard {
    name: string;
    description: string;
    usage: CardUsage;
    value: number;
}

interface Players {
    name: string;
    out: boolean;
    cards: Array<HandCard>;
}

interface Round {
    players: Array<Players>;
    turn_player: Players;
    winner?: string;
}

export interface GameStatus {
    game_id: string;
    players: Array<NamedPlayer>;
    rounds: Array<Round>;
}
