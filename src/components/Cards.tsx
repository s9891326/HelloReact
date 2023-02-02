import {HandCard} from "@/types";
import {useRef, useState} from "react";
import {playCard} from "@/api";
import {useGameId, useUsername} from "@/hook";

export function CardBack(props: { enabled: boolean }) {
    let cssConfig = {};
    if (!props.enabled) {
        cssConfig = {filter: "grayscale(1)", opacity: 0.7};
    }
    return (
        <div className="w-[118px] h-[172px] shadow-xl shadow-zinc-500 container relative">
            <img
                alt=""
                src="card-back.svg"
                className="bg-white rounded-xl gr"
                style={cssConfig}
            />
        </div>
    );
}


export function CardFront(props: { handCard: HandCard }) {
    const {handCard} = props;

    if (handCard === undefined) {
        return <CardBack enabled={true}/>;
    }

    return (
        <div className="w-[118px] h-[172px] shadow-xl shadow-zinc-500 container relative">
            <img
                alt=""
                src="card-front.svg"
                className="bg-white rounded-xl gr"
            />
            <div className="flex flex-col absolute top-[15px] p-2 text-white items-center">
                <div className="text-xs mb-1">{handCard.value}</div>
                <div className="text-2xl">{handCard.name}</div>
                <div className="text-[8pt] mt-2 p-1">{handCard.description}</div>
            </div>
        </div>
    );
}


export function CardAction(props: { handCard: HandCard }) {
    // const [gameId] = useGameId();
    const [username] = useUsername();
    const {handCard} = props;
    const refChoosePlayer = useRef(null);
    const refGuessCard = useRef(null);

    if (!handCard.usage.can_discard) {
        return <></>
    }

    const hasPlayerOptions = handCard.usage.choose_players.length > 0;
    const hasGuessCards = handCard.usage.can_guess_cards.length > 0;

    return (
        <>
            {hasPlayerOptions && (
                <select
                    className={"block w-full"}
                    defaultValue={handCard.usage.choose_players}
                    value={handCard.usage.choose_players}
                    ref={refChoosePlayer}
                    multiple={false}
                >
                    {handCard.usage.choose_players.map((p) => (
                        <option value={p}>{p}</option>
                    ))}
                </select>
            )}

            {hasGuessCards && (
                <select
                    className={"block w-full"}
                    defaultValue={handCard.usage.can_guess_cards}
                    value={handCard.usage.can_guess_cards}
                    ref={refGuessCard}
                    multiple={false}
                    onChange={(e) => {
                        console.log(e.target.value)
                    }}
                >
                    {handCard.usage.can_guess_cards.map((c) => (
                        <option value={c}>{c}</option>
                    ))}
                </select>
            )}

            <button onClick={() => {
                const payload: { [props: string]: string } = {};

                if (refChoosePlayer.current) {
                    payload.chosen_player = (refChoosePlayer.current as unknown as HTMLSelectElement).value;
                }

                if (refGuessCard.current) {
                    payload.guess_card = (refGuessCard.current as unknown as HTMLSelectElement).value;
                }
                console.log(payload);

                const result = playCard(gameId, username, handCard.name, payload);
            }}>
                打牌
            </button>
        </>
    )
}
