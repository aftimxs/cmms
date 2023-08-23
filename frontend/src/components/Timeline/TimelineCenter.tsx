import TimelineBar from "./TimelineBar.tsx";
import TimelineVerticalLines from "./TimelineVerticalLines.tsx";

const TimelineCenter = () => {
    return(
        <div className="col-10 border-start border-end">
            <div className="row bg-black h-100 align-items-center">
                <div className="container px-0 h-75">
                    <TimelineBar/>
                </div>
            </div>
        </div>
    )
}

export default TimelineCenter;