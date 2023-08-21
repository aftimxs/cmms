interface Props {
    progress: number[];
}

const ProgressBar = ({progress}:Props) => {
    return(
        <div className="progress-stacked">
            <div className="progress" role="progressbar" aria-label="good"
                 aria-valuenow={progress[0]} aria-valuemin={0} aria-valuemax={100} style={{width: progress[0] + "%"}}>
                <div className="progress-bar bg-success progress-bar-striped progress-bar-animated">{progress[0]}%</div>
            </div>
            <div className="progress" role="progressbar" aria-label="scrap"
                 aria-valuenow={progress[1]} aria-valuemin={0} aria-valuemax={100} style={{width: progress[1] + "%"}}>
                <div className="progress-bar bg-warning progress-bar-striped progress-bar-animated">{progress[1]}%</div>
            </div>
        </div>
    )
}

export default ProgressBar;