function ProgressBar() {
    return (
        <>
            <div className="w-full bg-text-dark rounded-full ">
                <div className="bg-text-light text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: "45%" }}> 45%  </div>

            </div>
            <div className="m-0 p-0">of goal reached</div>
        </>
    )
}

export default ProgressBar
