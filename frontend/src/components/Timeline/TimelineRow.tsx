import TimelineLeft from "./TimelineLeft.tsx";
import TimelineRight from "./TimelineRight.tsx";
import TimelineCenter from "./TimelineCenter.tsx";

const TimelineRow = ({ hour }:any) => {

    return (
        <div className="row" style={{height:'8vh'}}>
            <TimelineLeft
                hour = {hour}
            />
            <TimelineCenter
                hour = {hour}
            />
            <TimelineRight
                hour = {hour}
            />
        </div>
    )
};

export default TimelineRow;