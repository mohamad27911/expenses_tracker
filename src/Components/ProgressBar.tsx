interface ProgressBarProps {
    val: number;
  }
  

function ProgressBar({val}:ProgressBarProps) {
    const width = (val * 100) / 500000;
    return (
        <>
            <div className="w-full bg-text-dark rounded-full ">
                <div className="bg-text-light text-xs font-medium text-text  text-center p-1.5 leading-none rounded-full" style={{ width: `${width.toFixed(2)}%` }}>{width}%</div>

            </div>
            <div className="-mt-8 p-0 text-xs text-text-dark">{width}% of goal reached</div>
        </>
    )
}

export default ProgressBar
