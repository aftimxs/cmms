import TimelineBar from "./TimelineBar.tsx";
import dayjs from "dayjs";
import React, {useEffect, useMemo, useState} from "react";
import _ from 'lodash';
import axios from "axios";

const TimelineCenter = ({hour, data}:any) => {

    const shour = hour.split(':');
    const now = dayjs();

    const [bars, setBars] = useState([])

    const minutes:any = [];
    for (let i= 0; i < 60; i++){
        minutes.push({
            time: dayjs(data.shiftData.date, 'YYYY-MM-DD').add(shour[0], 'h').add(i, 'minute'),
            used: false
        })
    }

    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      timeout: 1000,
    });

    const getDowntimes = async (start:dayjs.Dayjs) => {
        try {
            const response = await instance.get('/downtime/', {
                params: {
                    shift: data.shiftData.number,
                    start: dayjs(start).format('HH:mm:ss')
                }
            })
            return await response.data[0].id
        } catch (error) {
            // @ts-ignore
            if (error.name === 'TypeError') {
                return 0
            }
        }
    }

    const postDowntime = (min:dayjs.Dayjs) => {
        if (!getDowntimes(min)){
            instance.post(`/downtime/`,
            {
                start: dayjs(min).format('HH:mm:ss'),
                end: dayjs(min).format('HH:mm:ss'),
                shift: data.shiftData.number,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }

    const putDowntime = (start:dayjs.Dayjs, min:dayjs.Dayjs) => {
        const id = getDowntimes(start)
        instance.put(`/downtime/${id}/`,
            {
                end: dayjs(min).format('HH:mm:ss'),
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
    }


    useEffect(() => {
        setBars([])
        setBars(printBars)
    }, [data]);


    const background = (now:dayjs.Dayjs) => {
        let counter = 1;
        let partsCounter = 0;
        let color = '';
        let id = 0;
        let startTime = now;
        let ms = [...minutes];
        const barsProv:any = [];

        const checkColor = (c:string, min:dayjs.Dayjs, unused:boolean, items:number) => {
            if (color !== c || c === 'bg-success' ) {
                id = id + 1;
                counter = 1;
                partsCounter = items;
                color = c;
                startTime = min;
            } else {
                counter = counter + 1;
                partsCounter = partsCounter + items;
            }
            handleBars(id, c, min, counter, partsCounter, startTime)
            if (!unused) {
                ms = _.reject(ms, {time: min})
            }
        }

        const handleBars = (id:number, color:string, minute:dayjs.Dayjs, counter:number, partsCounter:number, startTime:dayjs.Dayjs) => {
            barsProv.push({ id: id, long: counter, minute: minute, bg: color, parts: Number(partsCounter), startTime })
        }

        data.infoData.forEach((info:any) => {
            for (let i = 0; i < minutes.length; i++) {
                if (dayjs(info.minute, 'H:mm').minute() === minutes[i].time.minute()) {
                    if (info.item_count >= (data.productData[0].rate / 60)) {
                        checkColor('bg-success', minutes[i].time, false, info.item_count)
                    } else if (info.item_count < (data.productData[0].rate / 60) && info.item_count > 0) {
                        checkColor('bg-warning', minutes[i].time, false, info.item_count)
                    } else if (info.item_count == 0) {
                        checkColor('bg-danger', minutes[i].time, false, info.item_count)
                    }
                }
            }
        })

        ms.forEach((min) => {
            if (now.isAfter(min.time)){
                checkColor('bg-danger', min.time, true, 0)
            }
        })

        let sortedBars = []
        const byId = _.groupBy(barsProv, 'id')
        for (const id in byId){
            sortedBars.push(byId[id].slice(-1))
        }
        console.log(byId)
        sortedBars =  _.flatten(sortedBars)

        sortedBars =  _.sortBy(sortedBars, 'minute')


        //let danger = _.groupBy(sortedBars, 'bg')
        //danger = _.flatten(danger['bg-danger'])



        console.log(sortedBars)
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
                            data = {{
                                product : data.productData[0].part_num,
                                rate : (data.productData[0].rate/60),
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )

}

export default TimelineCenter;