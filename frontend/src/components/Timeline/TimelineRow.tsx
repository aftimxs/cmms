import TimelineLeft from "./TimelineLeft.tsx";
import TimelineRight from "./TimelineRight.tsx";
import TimelineCenter from "./TimelineCenter.tsx";


const TimelineRow = ({ hour, data }:any) => {

    console.log(data)

    return (<div className="row" style={{height:'7vh'}}>
                <TimelineLeft
                    hour = {hour}
                />
                <TimelineCenter/>
                <TimelineRight
                    data = {data}
                />
            </div>)
};

export default TimelineRow;