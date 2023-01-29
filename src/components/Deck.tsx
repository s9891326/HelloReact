import { CardBack } from "@/components";
import React from "react";

export function Deck() {
    return (
        <>
            {" "}
            {/*<div className="flex w-[118px] h-[172px] mr-2 shadow-xl shadow-pink-400 rounded-xl border-black text-slate-500 justify-center items-center">*/}
            {/*  <div className="w-auto">Last Played</div>*/}
            {/*  */}
            {/*</div>*/}
            <div>
                <CardBack enabled={true} />
            </div>
            <div className="container relative">
                {/* 牌堆 */}
                <div className="w-[118px] h-[172px] absolute top-[2px] left-[2px]">
                    <CardBack enabled={true} />
                </div>
                <div className="w-[118px] h-[172px] absolute top-[4px] left-[4px]">
                    <CardBack enabled={true} />
                </div>
                {/*  <!-- end of cards in the deck -->*/}
            </div>
        </>
    );
}
