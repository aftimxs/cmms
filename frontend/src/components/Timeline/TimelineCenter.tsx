import TimelineBar from "./TimelineBar.tsx";
import dayjs from "dayjs";
import {useEffect, useMemo, useState} from "react";
import _ from 'lodash';
import axios from "axios";

import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {barAdded} from "../../features/barsSlice.ts";
import {
    useDowntimeAddedMutation,
    useGetLineQuery,
    useGetLineState,
    useGetShiftDowntimesQuery
} from "../../app/services/apiSplice.ts";
import Grid from "@mui/material/Unstable_Grid2";
import {Container} from "@mui/material";


const TimelineCenter = ({ hour }:any) => {

    const dispatch = useAppDispatch()

    const lineParams = useAppSelector(state => state.line)

     const {shift, product, production} = useGetLineState(lineParams, {
        selectFromResult: ({data:state}) => ({
            shift: state? state['shift'][0] : undefined,
            product: state? state['shift'][0]? state['shift'][0]['order'][0]?
                state['shift'][0]['order'][0]['products'][0] : undefined : undefined : undefined,
            production: state? state['shift'][0]? _.groupBy(state['shift'][0]['info'],'hour')[hour] : undefined : undefined,
        })
    })

    const shour = hour.split(':');
    const now = dayjs();

    const [bars, setBars] = useState([])

    //CREATE MINUTES ARRAY
    const minutes:any = [];
    for (let i= 0; i < 60; i++){
        minutes.push(
            dayjs(shift?.date, 'YYYY-MM-DD').add(shour[0], 'h').add(i, 'minute')
        )
    }

    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      timeout: 1000,
    });

    //CHECK IF BAR EXISTS IN DB
    const getDowntimes = async (downtime:any) => {
        try {
            const response = await
                instance.get(`/downtime/${dayjs(downtime.startTime).format('DDMMYYHHmm')}${shift?.id}`)
            return await response.data
        } catch (error) {
            // @ts-ignore
            if (error.name === 'TypeError') {
                return []
            }
        }
    }

    //POST OR PUT BARS TO DB
    const postDowntime = async (downtime:any) => {
        const x = await getDowntimes(downtime)
        if (x){
            instance.put(`/downtime/${x.id}/`,
            {
                id: x.id,
                start: x.start,
                end: dayjs(downtime.minute).format('HH:mm:ss'),
                shift: x.shift
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
            instance.post(`/downtime/`,
            {
                id: `${dayjs(downtime.startTime).format('DDMMYYHHmm')}${shift?.id}`,
                start: dayjs(downtime.startTime).format('HH:mm:ss'),
                end: dayjs(downtime.minute).format('HH:mm:ss'),
                shift: shift?.number,
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }



    useEffect(() => {
        setBars([])
        // @ts-ignore
        setBars(printBars)
    }, [shift]);



    //MAKE ARRAY OF ALL THE BARS IN THAT HOUR
    const background = (now:dayjs.Dayjs) => {
        let counter = 1;
        let partsCounter = 0;
        let color = '';
        let id = 0;
        let startTime = now;
        let ms = [...minutes];
        const barsProv:any = [];
        let previous = now;

        //CHECK IF THIS MINUTES COLOR MATCHES PREVIOUS MINUTE COLOR
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
                ms = _.reject(ms, min)
            }
        }

        //PUSH EACH BAR INTO ARRAY
        const handleBars = (id:number, color:string, minute:dayjs.Dayjs, counter:number, partsCounter:number, startTime:dayjs.Dayjs) => {
            barsProv.push({ id: id, long: counter, minute: minute, bg: color, parts: Number(partsCounter), startTime })
        }

        //GET BGCOLOR FOR EACH MINUTE WITH DATA
        production?.forEach((info:any) => {
            for (let i = 0; i < minutes.length; i++) {
                if (dayjs(info.minute, 'H:mm').minute() === minutes[i].minute()) {
                    if (info.item_count >= (product?.rate / 60)) {
                        checkColor('bg-success', minutes[i], false, info.item_count)
                    } else if (info.item_count < (product?.rate / 60) && info.item_count > 0) {
                        checkColor('bg-warning', minutes[i], false, info.item_count)
                    } else if (info.item_count == 0) {
                        checkColor('bg-danger', minutes[i], false, info.item_count)
                    }
                }
            }
        })

        //SET BARS FOR UNUSED MINUTES WHICH ARE IN THE PAST
        ms.forEach((min) => {
            if (now.isAfter(min)){
                if ((dayjs(min, 'HH:mm').minute()-1) === dayjs(previous, 'HH:mm').minute()) {
                    previous = min;
                    counter = counter + 1;
                } else {
                    id = id + 1;
                    counter = 1;
                    startTime = min;
                    previous = min;
                }
                handleBars(id, 'bg-danger', min, counter, 0, startTime)
            }
        })

        //GROUP BARS BY ID
        let sortedBars = []
        const byId = _.groupBy(barsProv, 'id')
        for (const id in byId){
            sortedBars.push(byId[id].slice(-1))
        }

        //ORDER BARS BY MINUTE
        sortedBars =  _.flatten(sortedBars)
        sortedBars =  _.sortBy(sortedBars, 'minute')

        //SET BARS IN STORE
        sortedBars.map(bar => {
           dispatch(barAdded({
               id: `${dayjs(bar.startTime, 'DD-MM-YYYY HH:mm:ss Z').format('DDMMYYHHmm')}${shift?.id}`,
               startTime: bar.startTime.format('DD-MM-YYYY HH:mm:ss Z'),
               endTime: bar.minute.format('DD-MM-YYYY HH:mm:ss Z'),
               background: bar.bg,
               length: bar.long,
               parts: bar.parts,
           }))
        })

        //GROUP RED BARS INTO ARRAY AND POST TO DATABASE
        let danger = _.groupBy(sortedBars, 'bg')
        // @ts-ignore
        danger = _.flatten(danger['bg-danger'])
        // @ts-ignore
        for (let j = 0; j < danger.length; j++){
            postDowntime(danger[j])
        }

        return sortedBars;
    }


    const printBars = useMemo(() => background(now), [shift])


    return (
        // <div className="col-10 border-start border-end">
        //     <div className="row bg-black h-100 align-items-center">
        //         <div className="container px-0 h-75">
                <Grid container sx={{bgcolor:'black', paddingX:0}} xs={10} alignItems={'center'}>
                    {bars.map((bar: any, index: number) =>
                        <TimelineBar
                            key={index}
                            barData={bar}
                        />
                    )}
                </Grid>
        //         </div>
        //     </div>
        // </div>
    )

}

export default TimelineCenter;