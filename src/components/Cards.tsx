import {HandCard} from "../types";

export function CardBack(props: { enabled: boolean }) {
    let cssConfig = {};
    if (!props.enabled) {
        cssConfig = { filter: "grayscale(1)", opacity: 0.7 };
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
    const { handCard } = props;

    if (handCard === undefined) {
        return <CardBack enabled={true} />;
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
