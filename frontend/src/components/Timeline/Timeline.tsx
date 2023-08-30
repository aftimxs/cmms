import TimelineRow from "./TimelineRow.tsx";
import TimelineHeader from "./TimelineHeader.tsx";

const Timeline = ({ data }:any) => {

    // let hours:any = []
    // if (data.shiftData.shift_number === 1){
    //     hours = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm']
    // } else {
    //     hours = ['3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm']
    // }

    return (<div className="container-fluid">
                <TimelineHeader/>
                <TimelineRow
                    data = {data}
                />
            </div>)
};

export default Timeline;
