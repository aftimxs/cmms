import TimelineBar from "./TimelineBar.tsx";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {barAdded, barsReset} from "../../features/barsSlice.ts";
import {
    useDowntimeAddedMutation,
    useDowntimeUpdatedMutation,
    useGetLineState, useGetProductQuery, useLazyGetDowntimeQuery, useProductionInfoAddedMutation,
} from "../../app/services/apiSplice.ts";
import Grid from "@mui/material/Unstable_Grid2";
import {minuteAdded, minutesReset} from "../../features/minutesSlice.tsx";
import {produce} from "immer"


const TimelineCenter = ({ hour }:any) => {

    const dispatch = useAppDispatch()

    const lineParams = useAppSelector(state => state.line)

     const {shift, productID, production} = useGetLineState(lineParams, {
        selectFromResult: ({data:state}) => ({
            shift: state? state['shift'][0] : undefined,
            productID: state? state['shift'][0]? state['shift'][0]['order'][0]?
                state['shift'][0]['order'][0]['product'] : undefined : undefined : undefined,
            production: state? state['shift'][0]? _.groupBy(state['shift'][0]['info'],'hour')[hour] : undefined : undefined,
        })
    })

    const {data:product} = useGetProductQuery({id:productID})

    const now = dayjs();

    const [bars, setBars] = useState([])

    //CREATE MINUTES ARRAY
    const minutes:any = [];
    for (let i= 0; i < 60; i++){
        minutes.push(
            dayjs(shift?.date, 'YYYY-MM-DD').add(Number(dayjs(hour, 'HH:mm:ss').format('HH')), 'h').add(i, 'minute')
        )
    }

    //POST OR PUT BARS TO DB
    const [updateDowntime] = useDowntimeUpdatedMutation()
    const [addDowntime] = useDowntimeAddedMutation()
    const [getDowntime] = useLazyGetDowntimeQuery()

    const postDowntime = async (downtime:any) => {
        const query= await getDowntime({id:`${dayjs(downtime.startTime).format('DDMMYYHHmm')}${shift?.id}`})
        if (query.isSuccess){
            updateDowntime({
                id: query.data.id,
                start: query.data.start,
                end:dayjs(downtime.minute).format('HH:mm:ss'),
                shift: query.data.shift,
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

    //REFRESH EVERY 30SECS
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 30000);
        return function cleanup(){
            clearInterval(timer)
        }
    }, []);

    useEffect(() => {
        if (hour === '06:00:00' || hour === '15:00:00'){
            dispatch(barsReset())
            dispatch(minutesReset())
        }
        setBars([])
        // @ts-ignore
        setBars(background(now))
    }, [shift, date]);

    //MAKE ARRAY OF ALL THE BARS IN THAT HOUR
    const background = (now:dayjs.Dayjs) => {
        let counter = 1;
        let partsCounter = 0;
        let color = '';
        let id = 0;
        let startTime = now;
        let ms = [...minutes];
        let barsProv:any = [];
        let previous = now;

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
                updateBar(id, c, min)
            }
            //handleBars(id, c, min, counter, partsCounter, startTime)
            if (!unused) {
                ms = _.reject(ms, min)
            }
        }

        //PUSH EACH BAR INTO ARRAY
        //const handleBars = (id:number, color:string, minute:dayjs.Dayjs, counter:number, partsCounter:number, startTime:dayjs.Dayjs) => {
        //    barsProv.push({ id: id, long: counter, minute: minute, bg: color, parts: Number(partsCounter), startTime })
        //}

        const newBar = (id:number, color:string, minute:dayjs.Dayjs, counter:number, partsCounter:number, startTime:dayjs.Dayjs) => {
            const x = produce(barsProv, draftState => {
                draftState.push({ id: id, long: counter, minute: minute, bg: color, parts: Number(partsCounter), startTime })
            })
            barsProv = x
        }

        const updateBar = (id:number, color:string, minute:dayjs.Dayjs) => {
           const y = produce(barsProv, draftState => {
                draftState[id].minute = minute
            })
            //barsProv = y
        }

        //GET BGCOLOR FOR EACH MINUTE WITH DATA
        production?.forEach((info:any) => {
            dispatch(minuteAdded({minute: dayjs(info.minute, 'H:mm').format('h:mm a'), count: info.item_count}))
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
                dispatch(minuteAdded({minute: dayjs(min).format('h:mm a'), count: 0}))
                if ((dayjs(min, 'HH:mm').minute()-1) === dayjs(previous, 'HH:mm').minute()) {
                    previous = min;
                    counter = counter + 1;
                } else {
                    id = id + 1;
                    counter = 1;
                    startTime = min;
                    previous = min;
                }

                //handleBars(id, 'bg-danger', min, counter, 0, startTime)
            }
            // console.log(min)
            // console.log(now1)
            // console.log(min.isAfter(now1))
            // if (min.isAfter(now1)) {
            //      addProductionInfo({
            //         hour: hour,
            //         minute: dayjs(min).format('HH:mm:ss'),
            //         item_count: 0,
            //         line: shift.line,
            //         shift: shift.id,
            //     })
            //     ms = _.reject(ms, min)
            // }
        })

        console.log(barsProv)
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

    //const printBars = useMemo(() => background(now), [shift])

    return (
        <Grid
            container
            display="flex"
            sx={{bgcolor:'rgb(44,44,44)', paddingX:0}}
            xs={10}
            alignItems={'center'}
            component={'div'}
        >
            {bars.map((bar: any, index: number) =>
                    <TimelineBar
                        key={index}
                        barData={bar}
                    />
            )}
        </Grid>
    )

}

export default TimelineCenter;