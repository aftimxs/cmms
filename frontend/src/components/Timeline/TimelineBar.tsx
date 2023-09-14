import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import CommentModal from "./CommentModal.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import _ from 'lodash';

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

const BarTooltip = ({ type, barData, data }:any) => {
    
    let header = '';
    let start = '';
    let time = 0;
    const product = data.product;
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
        quantity = Number(-((data.rate*barData.long)-barData.parts).toFixed(2))
        
        if (type === 'bg-warning'){
            header = 'Speed Loss'
        } else {
            header = 'Downtime'
        }
    }    
     
    
    return(
        <>
            <Typography color='inherit'>{header}</Typography>
            {`Product: ${product}`}
            <br></br>
            {`Time: ${start} (${time} mins)`}
            <br></br>
            {`Quantity: ${quantity} pcs`}
        </>
    )
 }


const TimelineBar = ({barData, data}:any) => {
    const [barD, setBarD] = useState([])
    const w = barData.long * 1.6665

    useEffect(() => {
        setBarD(barData)
    }, []);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        getInfo(data.bars[_.indexOf(data.bars, barData)])
    };

    const [info, setInfo] = useState([])

    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      timeout: 1000,
    });

    const getInfo = async (bar:any) => {
        try {
            const response = await instance.get(`/downtime/${dayjs(bar.startTime).format('DDMMYYHHmm')}${data.shiftData.id}`)
            const x = await response.data
            setInfo(x)

        } catch (error) {
            // @ts-ignore
            if (error.name === 'TypeError') {
                const x: React.SetStateAction<never[]> = []
                setInfo(x)
            }
        }
    }

    const redBars = _.filter(data.bars, {'bg': 'bg-danger'})

    const handleBack = () => {
        getInfo(redBars[(_.indexOf(redBars, barD)-1)])
        setBarD(redBars[(_.indexOf(redBars, barD)-1)])
    }

    const handleForward = () => {
        getInfo(redBars[(_.indexOf(redBars, barD)+1)])
        setBarD(redBars[(_.indexOf(redBars, barD)+1)])
    }

    return(
        <>
            <CommentModal
                open={open}
                setOpen={setOpen}
                info={info}
                handlers={{
                    handleBack: handleBack,
                    handleForward: handleForward
                }}
                setBarD={setBarD}
            />

            <ProductionTooltip
                title={
                    <BarTooltip type={barData.bg} barData={barData} data={data}></BarTooltip>
                }
                enterDelay={200} leaveDelay={100}
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