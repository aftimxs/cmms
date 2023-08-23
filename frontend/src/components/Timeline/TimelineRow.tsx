import TimelineLeft from "./TimelineLeft.tsx";
import TimelineRight from "./TimelineRight.tsx";
import TimelineCenter from "./TimelineCenter.tsx";


const TimelineRow = () => {


    return (<div className="row" style={{height:'7vh'}}>
                <TimelineLeft/>
                <TimelineCenter/>
                <TimelineRight/>
            </div>)
};

export default TimelineRow;