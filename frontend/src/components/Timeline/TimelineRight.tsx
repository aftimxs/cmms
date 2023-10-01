import {useMemo} from "react";
import {useAppSelector} from "../../app/hooks.ts";
import {useGetAllScrapQuery, useGetLineState, useGetProductQuery} from "../../app/services/apiSplice.ts";
import _ from "lodash";
import dayjs from "dayjs";
import {skipToken} from "@reduxjs/toolkit/query";

const TimelineRight = ({ hour } : any) => {

    const lineParams = useAppSelector(state => state.line)

     const { shift, productID, production, } = useGetLineState(lineParams, {
        selectFromResult: ({data:state}) => ({
            shift: state? state['shift'][0] : undefined,
            productID: state? state['shift'][0]? state['shift'][0]['order'][0]?
                state['shift'][0]['order'][0]['product'] : undefined : undefined : undefined,
            production: state? state['shift'][0]? _.groupBy(state['shift'][0]['info'], 'hour')[hour] : undefined : undefined,
        })
    })

    const {data:product} = useGetProductQuery(productID ? {id:productID} : skipToken);
    const {data:scrap} = useGetAllScrapQuery(shift ? {shift: shift?.id} : skipToken);


    const total = () => {
        let counter = 0;
        production?.map((info:any) => {
            counter = counter + info.item_count
        })

        let scrapCounter = 0;
        scrap?.map((scr:any) => {
            if (dayjs(scr.minute, 'HH:mm:ss').hour() === Number((dayjs(hour, 'HH:mm:ss').format('H')))) {
                scrapCounter = scrapCounter + scr.pieces;
            }
        })
        return [counter, scrapCounter];
    }

    const partsMade = useMemo(() => total(), [shift, scrap])

    return(
        <div className="col-1 text-center">
            <div className="row h-100 align-items-center border-start">
                <h6>{partsMade[0]} <span style={{color:'#ffc107'}}>({partsMade[1]})</span> / {product?.rate}</h6>
            </div>
        </div>
    )
}

export default TimelineRight;
