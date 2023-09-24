import dayjs from "dayjs";

const TimelineLeft = ({ hour }:any) => {

    const formattedHour = dayjs(hour, 'HH:mm:ss').format('h a')

    return (<div className="col-1 text-center">
                <div className="row h-100 align-items-center border-end">
                    <h6>{formattedHour}</h6>
                </div>
            </div>)
};

export default TimelineLeft;
