import TimelineRow from "./TimelineRow.tsx";
import TimelineHeader from "./TimelineHeader.tsx";
import _ from 'lodash';

const Timeline = ({ data }:any) => {

    let hours:any = []
    if (data.shiftData.shift_number === 1){
        hours = ['06:00:00', '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00']
    } else {
        hours = ['3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm']
    }

    const byHour = _.groupBy(data.infoData, 'hour')

    const find = (hour:any) => {
        if (byHour[(hour).toString()] !== undefined){
            return byHour[(hour).toString()]
        } else {
            return []
        }
    }

    return (<div className="container-fluid">
                <TimelineHeader/>
                {hours.map((hour, index) =>
                    <TimelineRow
                        key = {index}
                        hour = {hour}
                        data = {{
                            shiftData: data.shiftData,
                            lineData: data.lineData,
                            orderData: data.orderData,
                            productData: data.productData,
                            infoData: find(hour),
                        }}
                    />
                )}

            </div>)
};

export default Timeline;
