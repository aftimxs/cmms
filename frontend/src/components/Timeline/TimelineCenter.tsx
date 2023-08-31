import TimelineBar from "./TimelineBar.tsx";
import dayjs from "dayjs";

const TimelineCenter = ({hour, data}:any) => {

    const minutes = [];
    for (let i= 0; i < 60; i++){
        minutes.push(dayjs(hour, 'H').add(i, 'minute'))
    }

    const background = (minute) => {
        for (let i = 0; i < data.infoData.length; i++) {
            //for (let j = 0; j < minutes.length; j++) {
                if (dayjs(data.infoData[i].minute, 'H:mm').minute() === minute.minute()) {
                    if (data.infoData[i].item_count >= (data.productData[0].rate / 60)) {
                        return 'bg-success'
                    } else if (data.infoData[i].item_count < (data.productData[0].rate / 60) && data.infoData[i].item_count > 0) {
                        return 'bg-warning'
                    } else {
                        return 'bg-danger'
                    }
                }
            //}
        }
    }

    return(
        <div className="col-10 border-start border-end">
            <div className="row bg-black h-100 align-items-center">
                <div className="container px-0 h-75">
                    {minutes.map((minute, index) =>
                        <TimelineBar
                            key = {index}
                            bg = {background(minute)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TimelineCenter;