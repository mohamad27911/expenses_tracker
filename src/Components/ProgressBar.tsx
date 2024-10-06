function ProgressBar() {
    return (
        <>
            <div className="w-full bg-text-dark rounded-full ">
                <div className="bg-text-light text-xs font-medium text-text  text-center p-1.5 leading-none rounded-full" style={{ width: "45%" }}>45%</div>

            </div>
            <div className="-mt-8 p-0 text-xs text-text-dark">45% of goal reached</div>
        </>
    )
}

export default ProgressBar
