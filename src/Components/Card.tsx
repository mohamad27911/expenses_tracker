import ProgressBar from "./ProgressBar";

interface PropsType {
    isProg: boolean;
    title: string;
    value: number;
}

function Card({ isProg, title, value }: PropsType) {
    return (
        <div className="bg-secondary text-white border border-text-light px-10 font-bold rounded-3xl">
            <h1 className="py-4 text-2xl">{title}</h1>
            <div className={`grid gap-10 ${isProg ? "mb-0" : "mb-8"}`}>
                <div className="mt-5 text-4xl">
                    {isProg ? "$500,000" : `$${new Intl.NumberFormat().format(value)}`}
                </div>
                {isProg && <ProgressBar val={value} />}
            </div>
        </div>
    );
}

export default Card;
