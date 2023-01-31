import new_icon from "./icons8-new-60.png";
import {GameEvent} from "@/types/event";
import {useContext} from "react";
import {GameContext} from "@/providers";

export function GameEvents() {
    const context = useContext(GameContext);
    if (!context.IsReady()) {
        return <></>;
    }

    const events = context.GameStatus()?.events;

    if (events === null || events?.length === 0) {
        return (
            <div className="flex-auto">
                <h1>遊戲事件</h1>
                <div className="bg-blue-200 m-4 p-2 min-h-[3rem] pl-3 rounded-xl flex items-center">
                    - (沒有消息) -
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex-auto">
                <h1>遊戲事件</h1>
                <div className="overflow-y-auto border-2 border-black shadow-2xl">
                    {events?.map((evt, index) => (
                        <>
                            <RoundEventView event={evt} index={index}/>
                            <CardEventView event={evt} index={index}/>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

function RoundEventView(props: { event: GameEvent, index: number }) {
    const context = useContext(GameContext);
    const {event, index} = props;

    if (event.type !== "round_started") {
        return <></>
    }

    let annotated: JSX.Element = <></>;

    if (event.winner) {
        annotated = (
            <div className="m-1 p-2 min-h-[1rem] pl-3 rounded-xl flex items-center text-[12px]">
                <p>{event.winner}</p>
                <p>成功送信給公主</p>
            </div>
        )
    } else {
        annotated = (
            <div className="m-1 p-2 min-h-[1rem] pl-3 rounded-xl flex items-center text-[12px]">
                <p>{context.GetStartPlayer()}</p>
                <p>為起始玩家</p>
            </div>
        )
    }

    return (
        <div className="m-1 p-2 min-h-[1rem] pl-3 rounded-xl flex items-center text-[12px]">
            <p>round started: </p>
            {annotated}
        </div>
    );
}

function CardEventView(props: { event: GameEvent, index: number }) {
    const {event, index} = props;

    if (event.type !== "card_action") {
        return <></>
    }

    // let extra = <></>;
    // if (event.took_effect.event !== null) {
    //     const evt = event.took_effect.event;
    //     extra = (
    //         <div>
    //             {"wip::"}
    //             {JSON.stringify(evt)}
    //         </div>
    //     )
    // }
    // console.log(extra);

    return (
        <>
            {/*{extra}*/}
            <CardActionItem {...props} />
        </>
    )
}

function CardActionItem(props: { event: GameEvent; index: number }) {
    const { event, index } = props;
    if (event.type !== "card_action") {
        return <></>;
    }

    if (event.with_card != null) {
        return (
            <div className="m-1 p-2 min-h-[1rem] pl-3 rounded-xl flex items-center text-[12px]">
                <p>{event.turn_player}</p>
                &nbsp;使用&nbsp;
                <p>{event.card}</p>
                &nbsp;猜測&nbsp;
                <p>{event.to}</p>
                &nbsp;有&nbsp;
                <p>{event.with_card}</p>
                <NewIcon display={index === 0} />
            </div>
        )
    }

    if (event.to != null) {
        return (
            <div className="m-1 p-2 min-h-[1rem] pl-3 rounded-xl flex items-center text-[12px]">
                <p>{event.turn_player}</p>
                &nbsp;對&nbsp;
                <p>{event.to}</p>
                &nbsp;使用&nbsp;
                <p>{event.card}</p>
                <NewIcon display={index === 0} />
            </div>
        )
    }

    return (
        <div className="m-1 p-2 min-h-[1rem] pl-3 rounded-xl flex items-center text-[12px]">
            <p>{event.turn_player}</p>
            &nbsp;使用&nbsp;
            <p>{event.card}</p>
            <NewIcon display={index === 0} />
        </div>
    )
}

function NewIcon(props: { display: boolean }) {
    // source: https://icons8.com/icons/set/new
    if (!props.display) {
        return <></>;
    }
    return (
        <img
            src={new_icon}
            alt=""
            width={24}
            className="ml-2 shadow-2xl shadow-amber-500"
        />
    );
}