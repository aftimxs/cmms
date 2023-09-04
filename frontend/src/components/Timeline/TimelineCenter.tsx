import TimelineBar from "./TimelineBar.tsx";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import _ from 'lodash';

const TimelineCenter = ({hour, data}:any) => {

    let shour = hour.split(':');
    let now = dayjs();

    let initialMinutes:any = [];
    for (let i= 0; i < 60; i++){
        initialMinutes.push({
            time: dayjs(data.shiftData.date, 'YYYY-MM-DD').add(shour[0], 'h').add(i, 'minute'),
            used: false
        })
    }

    let [minutes, setMinutes] = useState(initialMinutes);
    let [unusedMinutes, setUnusedMinutes] = useState([])
    let [bars, setBars] = useState([])


    useEffect(() => {
        setBars([])
        background(now)
    }, [data]);

    const handleBars = (id:number, color:string, minute:dayjs.Dayjs, counter:number) => {
        // @ts-ignore
        setBars(prevState => [
            ...prevState,
            { id: id, long: counter, minute: minute, bg: color }
        ]);
    }

    function updateMinutes(m) {
        const newMinutes = minutes.map(minute => {
            if (minute.time == m.time) {
                return {
                    ...minute,
                    used: true
                }
            } else {
                return minute
            }
        })
        setMinutes(newMinutes)
    }

    const background = (now:dayjs.Dayjs) => {
        let counter = 1;
        let color = '';
        let id = 0;
        let ms = [...initialMinutes];

        const checkColor = (c, min, unused) => {
            if (color !== c) {
                id = id + 1;
                counter = 1;
                color = c;
            } else {
                counter = counter + 1;
            }
            handleBars(id, c, min, counter)
            if (!unused) {
                _.pull(ms, min);
            }
        }

        data.infoData.forEach((info:any) => {
            for (let i = 0; i < minutes.length; i++) {
                if (!minutes[i].used){
                    if (dayjs(info.minute, 'H:mm').minute() === minutes[i].time.minute()) {
                        if (info.item_count >= (data.productData[0].rate / 60)) {
                            checkColor('bg-success', minutes[i].time, false)
                            updateMinutes(minutes[i])

                        } else if (info.item_count < (data.productData[0].rate / 60) && info.item_count > 0) {
                            checkColor('bg-warning', minutes[i].time, false)
                            updateMinutes(minutes[i])

                        } else if (info.item_count == 0) {
                            checkColor('bg-danger', minutes[i].time, false)
                            updateMinutes(minutes[i])

                        }
                    }
                }
            }
        })

        ms.forEach((min) => {
            if (now.isAfter(min)){
                checkColor('bg-danger', min, true)
            }
        })

    }

    const sortBars = () => {
        let x = []
        let byId = _.groupBy(bars, 'id')
        for (let id in byId){
            x.push(byId[id].slice(-1))
        }
        x =  _.flatten(x)
        return  _.sortBy(x, 'minute')
    }

    if (hour == '06:00:00'){
        console.log(minutes)
    }

    return (
        <div className="col-10 border-start border-end">
            <div className="row bg-black h-100 align-items-center">
                <div className="container px-0 h-75">
                    {sortBars().map((bar: any, index: number) => <TimelineBar
                            key={index}
                            bg={bar}
                        />
                    )}
                </div>
            </div>
        </div>
    )

}

export default TimelineCenter;