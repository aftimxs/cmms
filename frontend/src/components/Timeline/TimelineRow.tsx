import TimelineLeft from "./TimelineLeft.tsx";
import TimelineRight from "./TimelineRight.tsx";
import TimelineCenter from "./TimelineCenter.tsx";
import {useEffect} from "react";


const TimelineRow = ({ hour, data }:any) => {

    return (<div className="row" style={{height:'7vh'}}>
                <TimelineLeft
                    hour = {hour}
                />
                <TimelineCenter
                    hour = {hour}
                    data = {data}
                />
                <TimelineRight
                    data = {data}
                />
            </div>)
};

export default TimelineRow;