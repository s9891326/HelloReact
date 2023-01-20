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