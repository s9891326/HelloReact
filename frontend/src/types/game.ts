export interface SeenCard {
    name: string;
}

export interface Seen {
    opponent_name: string;
    card: SeenCard;
}

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
    cards: Array<HandCard>;
    seen_cards: Array<Seen>;
}

export interface TurnPlayer {
    name: string;
    out: boolean;
    cards: Array<HandCard>;
}

export interface Round {
    players: Array<Players>;
    turn_player: TurnPlayer;
    winner?: string;
    start_player: string;
}