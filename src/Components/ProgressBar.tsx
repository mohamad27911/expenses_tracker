interface ProgressBarProps {
    val: number; // The current value towards the goal
}

function ProgressBar({ val }: ProgressBarProps) {
    const goal = 10000; // Define your goal
    let width = 0;

    // Calculate width as a percentage of the goal
    if (val < 0) {
        width = 0; // Ensure that negative values don't affect the progress
    } else if (val >= goal) {
        width = 100; // Cap the width at 100% if the goal is met or exceeded
    } else {
        width = (val * 100) / goal; // Calculate the percentage of the goal reached
    }

    return (
        <>
            <div className="w-full bg-text-dark rounded-full ">
                <div
                    className="bg-text-light text-xs font-medium text-text text-center p-1.5 leading-none rounded-full"
                    style={{ width: `${width.toFixed(2)}%` }}
                >
                    {width.toFixed(2)}%
                </div>
            </div>
            <div className="-mt-8 p-0 text-xs text-text-dark">{width.toFixed(2)}% of goal reached</div>
        </>
    );
}

export default ProgressBar;
