import TimelineRow from "./TimelineRow.tsx";
import TimelineHeader from "./TimelineHeader.tsx";
import {useAppSelector} from "../../app/hooks.ts";


const Timeline = () => {

    const lineParams = useAppSelector(state => state.line)

    let hours:any = []
    if (lineParams.number === '1'){
        hours = ['06:00:00', '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00']
    } else if (lineParams.number === '2'){
        hours = ['15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00']
    }

    return (<div className="container-fluid" data-bs-theme="light">
                <TimelineHeader/>
                    {hours.map((hour:string, index:number) =>
                        <TimelineRow
                            key = {index}
                            hour = {hour}
                        />
                    )}
            </div>)
};

export default Timeline;
