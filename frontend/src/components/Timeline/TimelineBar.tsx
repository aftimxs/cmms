import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import CommentModal from "./CommentModal.tsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    useGetLineState,
    useGetProductQuery,
    useLazyGetDowntimeQuery, useLazyGetScrapQuery,
} from "../../app/services/apiSplice.ts";
import {downtimeSelected} from "../../features/downtimeSlice.ts";
import Box from '@mui/material/Box';
import {Container} from "@mui/material";
import ScrapIndicator from "./ScrapIndicator.tsx";
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

const BarTooltip = ({ type, barData, product }:any) => {

    let header = '';
    let start = '';
    let time = 0;
    let quantity = 0;
    let startMin = 0;
    let endMin = 0;
    let loss = 0;

    if (type === 'bg-success'){
        header = 'Production Signal'
        start = dayjs(barData.minute).format('h:mm a')
        quantity = barData.parts

    } else {
        startMin = dayjs(barData.startTime).minute();
        endMin = dayjs(barData.minute).minute();
        start = dayjs(barData.startTime).format('h:mm a')
        time = (endMin-startMin+1)
        quantity = barData.parts
        loss = Number(-(((product?.rate/60)*barData.long)-barData.parts).toFixed(2))
        
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
            <br></br>
            {loss ? `Loss: ${loss} pcs` : ''}
        </>
    )
}

const color = (background:string) => {
         switch (background){
            case 'bg-success': {
                return '#198754';
            }
            case 'bg-warning': {
                return '#ffc107';
            }
            case 'bg-danger': {
                return '#dc3545';
            }
            default: {
                return 'black';
            }
        }
}

const TimelineBar = ({ barData }:any) => {

    const dispatch = useAppDispatch()

    const bars = useAppSelector(state => state.bars)

    const lineParams = useAppSelector(state => state.line)
    const {shift, productID, allScrap} = useGetLineState(lineParams, {
        selectFromResult: ({data: state}) => ({
            shift: state ? state['shift'][0] : undefined,
            productID: state ? state['shift'][0] ? state['shift'][0]['order'][0] ?
                state['shift'][0]['order'][0]['product'] : undefined : undefined : undefined,
            allScrap: state ? state['shift'][0] ? state['shift'][0]['scrap'] ? state['shift'][0]['scrap'] : undefined : undefined : undefined,
        })
    })

    const {data:product} = useGetProductQuery({id:productID})

    const w = barData.long * 1.6665

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        dispatch(downtimeSelected({
            id: `${dayjs(barData.startTime, 'DD-MM-YYYY HH:mm:ss Z').format('DDMMYYHHmm')}${shift?.id}`,
            start: dayjs(barData.startTime).format('DD-MM-YYYY HH:mm:ss Z'),
            end: dayjs(barData.minute).format('DD-MM-YYYY HH:mm:ss Z'),
            shift: shift?.id,
            background: barData.bg,
            length: barData.long,
            parts: barData.parts,
        }))
    };

    const handleClick = (type:string, bar:any) => {
        let newIndex = 0;
        const index = bars.findIndex((obj:any) => {
            return obj.id === bar.id;
        })
        if (type === 'back'){
            newIndex = index-1;
        } else if (type === 'forward'){
            newIndex = index+1;
        }
        if (newIndex >= 0 && newIndex < bars.length) {
            dispatch(downtimeSelected({
                id: bars[newIndex].id,
                start: bars[newIndex].startTime,
                end: bars[newIndex].endTime,
                shift: shift?.id,
                background: bars[newIndex].background,
                length: bars[newIndex].length,
                parts: bars[newIndex].parts,
            }))
            }
    };

    const [getBarDowntime, {data:nonGreenData}] = useLazyGetDowntimeQuery();
    //const [getScrap, {data:scrap}] = useLazyGetScrapQuery()

    const ID = `${dayjs(barData.startTime, 'DD-MM-YYYY HH:mm:ss Z').format('DDMMYYHHmm')}${shift?.id}`

    //let scrap = undefined;

    useEffect(() => {
        if (barData.bg === 'bg-danger'){
            getBarDowntime({id: ID})
        } else if (barData.bg !== 'bg-danger' && _.find(allScrap, {id:'S'+ID})) {
            //scrap = _.find(allScrap, {id:'S'+ID})
        }
    }, [barData]);

    const [barReason, setBarReason] = useState('');

    useEffect(() => {
        setBarReason(nonGreenData?.reason)
    }, [nonGreenData]);

    return(
        <>
            <CommentModal
                open={open}
                setOpen={setOpen}
                handleClick = {handleClick}
                setBarReason = {setBarReason}
            />

            <ProductionTooltip
                title={
                    <BarTooltip type={barData.bg} barData={barData} product={product} ></BarTooltip>
                }
                enterDelay={200}
                leaveDelay={100}
                arrow
            >

                <Container
                    sx={{
                        width:`${w}%`,
                        height:'75%',
                        backgroundColor: color(barData.bg),
                        marginX:0,
                        display:'grid',
                        overflow: 'hidden'
                    }}
                    disableGutters
                    maxWidth={false}
                    onClick={handleOpen}
                >
                    <Box
                        sx={{height: '100%',
                            color: 'white',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1rem',
                            fontWeight: '400',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {barData.bg !== 'bg-success' ? barReason : ' '}

                    </Box>
                    {barData.bg !== 'bg-danger' ? <ScrapIndicator scrap={_.find(allScrap, {id:'S'+ID}) ? _.find(allScrap, {id:'S'+ID}) : undefined}/> : <></>}
                </Container>
            </ProductionTooltip>
        </>
    )
};

export default TimelineBar;