import {GameEvent} from "@/types/event";
import {Seen} from "@/types/game";

export type ViewState = "pick-name" | "game-list" | "game-room";

export interface NamedPlayer {
    name: string;
    score: number;
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
    seen_cards: Array<Seen>;
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
    events: Array<GameEvent>;
}
