import React, {useContext} from "react";
import {GameContext} from "@/providers";
import {CardAction} from "@/components/Cards";

export function Deck() {
    const context = useContext(GameContext)

    if (!context.IsReady() || !context.IsMyTurn()) {
        return <></>
    }

    const cards = context.GetTurnPlayer().cards;

    return (
        <>
            <div className={"w-[300px] h-[172px] justify-center items-center rounded-xl bg-slate-300 flex"}>
                <div>
                    <div className={"text-xs"}>{cards[0].name}</div>
                    <CardAction handCard={cards[0]}/>
                </div>

                <div>
                    <div className={"text-xs"}>{cards[1].name}</div>
                    <CardAction handCard={cards[1]}/>
                </div>
            </div>
        </>
    );
}
