import TimelineBar from "./TimelineBar.tsx";
import dayjs from "dayjs";
import {useEffect, useMemo, useState} from "react";
import _ from 'lodash';

const TimelineCenter = ({hour, data}:any) => {

    let shour = hour.split(':');
    let now = dayjs();

    let minutes:any = [];
    for (let i= 0; i < 60; i++){
        minutes.push({
            time: dayjs(data.shiftData.date, 'YYYY-MM-DD').add(shour[0], 'h').add(i, 'minute'),
            used: false
        })
    }

    let [bars, setBars] = useState([])


    useEffect(() => {
        setBars([])
        // @ts-ignore
        setBars(printBars)
    }, [data]);


    const background = (now:dayjs.Dayjs) => {
        let counter = 1;
        let color = '';
        let id = 0;
        let ms = [...minutes];
        let barsProv:any = [];

        const checkColor = (c:string, min:any, unused:boolean) => {
            if (color !== c || c === 'bg-success' ) {
                id = id + 1;
                counter = 1;
                color = c;
            } else {
                counter = counter + 1;
            }
            handleBars(id, c, min, counter)
            if (!unused) {
                ms = _.reject(ms, {time: min})
            }
        }

        const handleBars = (id:number, color:string, minute:dayjs.Dayjs, counter:number) => {
            barsProv.push({ id: id, long: counter, minute: minute, bg: color })
        }

        data.infoData.forEach((info:any) => {
            for (let i = 0; i < minutes.length; i++) {
                if (dayjs(info.minute, 'H:mm').minute() === minutes[i].time.minute()) {
                    if (info.item_count >= (data.productData[0].rate / 60)) {
                        checkColor('bg-success', minutes[i].time, false)
                    } else if (info.item_count < (data.productData[0].rate / 60) && info.item_count > 0) {
                        checkColor('bg-warning', minutes[i].time, false)
                    } else if (info.item_count == 0) {
                        checkColor('bg-danger', minutes[i].time, false)
                    }
                }
            }
        })

        ms.forEach((min) => {
            if (now.isAfter(min.time)){
                checkColor('bg-danger', min, true)
            }
        })

        let sortedBars = []
        let byId = _.groupBy(barsProv, 'id')
        for (let id in byId){
            sortedBars.push(byId[id].slice(-1))
        }
        sortedBars =  _.flatten(sortedBars)
        sortedBars =  _.sortBy(sortedBars, 'minute')

        return sortedBars;
    }

    const printBars = useMemo(() => background(now), [data.infoData])


    return (
        <div className="col-10 border-start border-end">
            <div className="row bg-black h-100 align-items-center">
                <div className="container px-0 h-75">
                    {bars.map((bar: any, index: number) =>
                        <TimelineBar
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