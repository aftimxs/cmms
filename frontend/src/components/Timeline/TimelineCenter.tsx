import TimelineBar from "./TimelineBar.tsx";
import dayjs from "dayjs";
import {useCallback, useEffect, useState} from "react";
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {barAdded, barsReset} from "../../features/barsSlice.ts";
import {
    useDowntimeAddedMutation,
    useDowntimeUpdatedMutation,
    useGetLineState,
    useGetProductQuery,
    useGetShiftDowntimesQuery, useGetShiftSpeedLossQuery,
    useSpeedlossAddedMutation,
    useSpeedlossUpdatedMutation,
} from "../../app/services/apiSplice.ts";
import Grid from "@mui/material/Unstable_Grid2";
import {minuteAdded, minutesReset} from "../../features/minutesSlice.tsx";
import {produce} from "immer"
import {Skeleton} from "@mui/material";
import {skipToken} from "@reduxjs/toolkit/query";

interface sortedBars {
    id: string,
    startTime: dayjs.Dayjs,
    minute: dayjs.Dayjs,
    bg: string,
    long: number,
    parts: number,
}


const TimelineCenter = ({ hour }:any) => {

    const dispatch = useAppDispatch()

    const lineParams = useAppSelector(state => state.line)

     const {shift, productID, production, requestId, isLoading} = useGetLineState(lineParams, {
        selectFromResult: ({currentData:state, requestId, isLoading}) => ({
            shift: state? state['shift'][0] : undefined,
            productID: state? state['shift'][0]? state['shift'][0]['order'][0]?
                state['shift'][0]['order'][0]['product'] : undefined : undefined : undefined,
            production: state? state['shift'][0]? _.groupBy(state['shift'][0]['info'],'hour')[hour] : undefined : undefined,
            requestId,
            isLoading,
        })
    })

    const {currentData:product} = useGetProductQuery(productID ? {id:productID} : skipToken);
    const {currentData:downtimes} = useGetShiftDowntimesQuery(shift ? shift?.id : skipToken)
    const {currentData:speedlosses} = useGetShiftSpeedLossQuery(shift ? shift?.id : skipToken)

    const now = dayjs();

    const initialBars:sortedBars[] = []
    const [bars, setBars] = useState(initialBars)

    //CREATE MINUTES ARRAY
    const minutes:any = [];
    for (let i= 0; i < 60; i++){
        minutes.push(
            dayjs(shift?.date, 'YYYY-MM-DD').add(Number(dayjs(hour, 'HH:mm:ss').format('HH')), 'h').add(i, 'minute')
        )
    }

    //POST OR PUT BARS TO DB
    const [updateDowntime] = useDowntimeUpdatedMutation();
    const [addDowntime] = useDowntimeAddedMutation();

    const [updateSpeedLoss] = useSpeedlossUpdatedMutation();
    const [addSpeedLoss] = useSpeedlossAddedMutation();

    const postDowntime = async (downtime:any) => {
        const query:any = await _.find(downtimes, {'id':`${dayjs(downtime.startTime).format('DDMMYYHHmm')}${shift?.id}`})
        if (downtimes) {
            if (query){
                updateDowntime({
                    id: query.id,
                    start: query.start,
                    end:dayjs(downtime.minute).format('HH:mm:ss'),
                    shift: query.shift,
                })
            } else {
                addDowntime({
                    id: `${dayjs(downtime.startTime).format('DDMMYYHHmm')}${shift?.id}`,
                    start: dayjs(downtime.startTime).format('HH:mm:ss'),
                    end: dayjs(downtime.minute).format('HH:mm:ss'),
                    shift: shift?.id,
                })
            }
        }
    }

    const postSpeedLoss = async (speedLoss:any) => {
        const query:any = await _.find(speedlosses, {'id':`${dayjs(speedLoss.startTime).format('DDMMYYHHmm')}${shift?.id}`})
        if (speedlosses) {
            if (query){
                updateSpeedLoss({
                    id: query.id,
                    start: query.start,
                    end:dayjs(speedLoss.minute).format('HH:mm:ss'),
                    shift: query.shift,
                })
            } else {
                addSpeedLoss({
                    id: `${dayjs(speedLoss.startTime).format('DDMMYYHHmm')}${shift?.id}`,
                    start: dayjs(speedLoss.startTime).format('HH:mm:ss'),
                    end: dayjs(speedLoss.minute).format('HH:mm:ss'),
                    shift: shift?.id,
                })
            }
        }
    }

    useEffect(() => {
        setBars(background(now))
    }, [shift, requestId, product]);


    //MAKE ARRAY OF ALL THE BARS IN THAT HOUR
    const background = useCallback((now:dayjs.Dayjs) => {
        let counter = 1;
        let partsCounter = 0;
        let color = '';
        let id = -1;
        let startTime = now;
        let ms = [...minutes];
        let barsProv:any = [];
        let previous = now;

        if (hour === '06:00:00' || hour === '15:00:00'){
            dispatch(barsReset())
            dispatch(minutesReset())
        }

        //CHECK IF THIS MINUTES COLOR MATCHES PREVIOUS MINUTE COLOR
        const checkColor = (c:string, min:dayjs.Dayjs, unused:boolean, items:number) => {
            if (color !== c || c === 'bg-success' ) {
                id = id + 1;
                counter = 1;
                partsCounter = items;
                color = c;
                startTime = min;
                newBar(id, c, min, counter, partsCounter, startTime)
            } else {
                counter = counter + 1;
                partsCounter = partsCounter + items;
                updateBar(id, counter, min)
            }
            if (!unused) {
                ms = _.reject(ms, min)
            }
        }

        const newBar = (id:number, color:string, minute:dayjs.Dayjs, counter:number, partsCounter:number, startTime:dayjs.Dayjs) => {
            barsProv = produce(barsProv, (draftState: { id: number; long: number; minute: dayjs.Dayjs; bg: string; parts: number; startTime: dayjs.Dayjs; }[]) => {
                draftState.push({
                    id: id,
                    long: counter,
                    minute: minute,
                    bg: color,
                    parts: Number(partsCounter),
                    startTime
                })
            })
        }

        const updateBar = (id:number, counter:number, minute:dayjs.Dayjs) => {
            barsProv = produce(barsProv, (draftState: { minute:dayjs.Dayjs, long: number; }[]) => {
                draftState[id].minute = minute
                draftState[id].long = counter
            })
        }

        //GET BGCOLOR FOR EACH MINUTE WITH DATA
        production?.forEach((info:any) => {
            for (let i = 0; i < minutes.length; i++) {
                if (dayjs(info.minute, 'H:mm').minute() === minutes[i].minute()) {
                    dispatch(minuteAdded({
                        id: Number(dayjs(info.minute, 'H:mm').format('Hmm')),
                        minute: dayjs(info.minute, 'H:mm').format('h:mm a'),
                        count: info.item_count
                    }))
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
            if (now.isAfter(dayjs(min).add(1, 'minute'))){
                dispatch(minuteAdded({
                    id: Number(dayjs(min, 'H:mm').format('Hmm')),
                    minute: dayjs(min).format('h:mm a'),
                    count: 0}))
                if ((dayjs(min, 'HH:mm').minute()-1) === dayjs(previous, 'HH:mm').minute()) {
                    previous = min;
                    counter = counter + 1;
                    updateBar(id, counter, min)
                } else {
                    id = id + 1;
                    counter = 1;
                    startTime = min;
                    previous = min;
                    newBar(id, 'bg-danger', min, counter, 0, startTime)
                }
            }
        })

        //ORDER BARS BY MINUTE
        const sortedBars:sortedBars[] =  _.sortBy(barsProv, 'minute')

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
        const bgGrouped = _.groupBy(sortedBars, 'bg')
        const danger = _.flatten(bgGrouped['bg-danger'])
        const warning = _.flatten(bgGrouped['bg-warning'])

        for (let j = 0; j < danger.length; j++){
            postDowntime(danger[j])
        }

        for (let q = 0; q < warning.length; q++){
            postSpeedLoss(warning[q])
        }

        return sortedBars;
    }, [shift, requestId, product])

    if (isLoading) return (
        <Grid
            container
            display="flex"
            sx={{bgcolor:'rgb(44,44,44)', paddingX:0}}
            xs={10}
            alignItems={'center'}
            component={'div'}
        >
            <Skeleton
              sx={{ bgcolor: 'grey.800' }}
              variant="rectangular"
              width={'100%'}
              height={'75%'}
            />
        </Grid>
    )

    return (
        <Grid
            container
            display="flex"
            sx={{bgcolor:'rgb(44,44,44)', paddingX:0}}
            xs={10}
            alignItems={'center'}
            component={'div'}
        >
            {
                bars.map((bar: any, index: number) => (
                    <TimelineBar
                        key={index}
                        barData={bar}
                    />
                ))
            }
        </Grid>
    )

}

export default TimelineCenter;