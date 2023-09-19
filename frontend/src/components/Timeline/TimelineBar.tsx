import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import CommentModal from "./CommentModal.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useGetLineState} from "../../app/services/apiSplice.ts";
import {downtimeSelected} from "../../features/downtimeSlice.ts";


const ProductionTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltipArrow}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, .9)',
      maxWidth: 900,
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#f5f5f9',
      },
  });

const BarTooltip = ({ type, barData, product }:any) => {

    let header = '';
    let start = '';
    let time = 0;
    let quantity = 0;
    let startMin = 0;
    let endMin = 0;

    if (type === 'bg-success'){
        header = 'Production Signal'
        start = dayjs(barData.minute).format('HH:mm')
        quantity = barData.parts

    } else {
        startMin = dayjs(barData.startTime).minute();
        endMin = dayjs(barData.minute).minute();
        start = dayjs(barData.startTime).format('HH:mm')
        time = (endMin-startMin+1)
        quantity = Number(-(((product.rate/60)*barData.long)-barData.parts).toFixed(2))
        
        if (type === 'bg-warning'){
            header = 'Speed Loss'
        } else {
            header = 'Downtime'
        }
    }    

    return(
        <>
            <Typography color='inherit'>{header}</Typography>
            {`Product: ${product? product.part_num : "N/A"}`}
            <br></br>
            {`Time: ${start} (${time} mins)`}
            <br></br>
            {`Quantity: ${quantity} pcs`}
        </>
    )
 }


const TimelineBar = ({ barData }:any) => {

    const dispatch = useAppDispatch()
    const bars = useAppSelector(state => state.bars)
    const lineParams = useAppSelector(state => state.line)
    const {shift, product, downtimes} = useGetLineState(lineParams, {
        selectFromResult: ({data: state}) => ({
            shift: state ? state['shift'][0] : undefined,
            product: state ? state['shift'][0] ? state['shift'][0]['order'][0] ?
                state['shift'][0]['order'][0]['products'][0] : undefined : undefined : undefined,
            downtimes: state ? state['shift'][0]? state['shift'][0]['downtime'] : undefined : undefined,
        })
    })

    const w = barData.long * 1.6665

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        dispatch(downtimeSelected({
            id: `${dayjs(barData.startTime, 'DD-MM-YYYY HH:mm:ss Z').format('DDMMYYHHmm')}${shift?.id}`,
            start: dayjs(barData.startTime,).format('HH:mm:ss'),
            end: dayjs(barData.minute).format('HH:mm:ss'),
            shift: shift?.id,
            background: barData.bg,
            length: barData.long,
            parts: barData.parts,
        }))
        //dispatch(downtimeSelected({
        //    id: `${dayjs(barData.startTime, 'DD-MM-YYYY HH:mm:ss Z').format('DDMMYYHHmm')}${shift?.id}`,
        //    start: dayjs(barData.startTime,).format('HH:mm:ss'),
        //    end: dayjs(barData.minute).format('HH:mm:ss'),
        //    shift: shift?.id,
        //    reason: null,
        //    description: null,
        //}))
    };

    const handleClick = (type:string, downtime:any) => {
        let newId = 0;
        const id = downtimes.findIndex((obj:any) => {
            return obj.id === downtime.id;
        })
        if (type === 'back'){
            newId = id-1;
        } else if (type === 'forward'){
            newId = id+1;
        }
        if (newId >= 0 && newId < downtimes.length) {
            dispatch(downtimeSelected({
                id: downtimes[newId].id,
                start: downtimes[newId].start,
                end: downtimes[newId].end,
                shift: shift?.id,
                reason: null,
                description: null,
            }))
            }
    };

    const downtime = useAppSelector(state => state.downtime)

    return(
        <>
            <CommentModal
                open={open}
                setOpen={setOpen}
                handleClick = {handleClick}
                downtime = {downtime}
            />

            <ProductionTooltip
                title={
                    <BarTooltip type={barData.bg} barData={barData} product={product} ></BarTooltip>
                }
                enterDelay={200}
                leaveDelay={100}
                arrow
            >
                <div className={`d-inline-block h-100 position-relative ${barData.bg}`} style={{width:`${w}%`}} onClick={handleOpen}>
                    <span className={barData.bg === 'bg-success' ? `position-absolute top-100 start-100 translate-middle badge border border-2
                        border-light rounded-circle bg-dark p-1` : 'visually-hidden'}
                          style={{zIndex:1}}><span className="visually-hidden">x</span></span>

                </div>
            </ProductionTooltip>
        </>
    )
};

export default TimelineBar;