import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import CommentModal from "./CommentModal.tsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useGetDowntimeQuery, useGetLineState} from "../../app/services/apiSplice.ts";
import {downtimeSelected} from "../../features/downtimeSlice.ts";
import Box, { BoxProps } from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2";
import {Avatar, Badge} from "@mui/material";


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
    const {shift, product} = useGetLineState(lineParams, {
        selectFromResult: ({data: state}) => ({
            shift: state ? state['shift'][0] : undefined,
            product: state ? state['shift'][0] ? state['shift'][0]['order'][0] ?
                state['shift'][0]['order'][0]['products'][0] : undefined : undefined : undefined,
        })
    })

    const w = barData.long * 1.6665

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        dispatch(downtimeSelected({
            id: `${dayjs(barData.startTime, 'DD-MM-YYYY HH:mm:ss Z').format('DDMMYYHHmm')}${shift?.id}`,
            start: dayjs(barData.startTime).format('HH:mm:ss'),
            end: dayjs(barData.minute).format('HH:mm:ss'),
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
                start: dayjs(bars[newIndex].startTime, 'DD-MM-YYYY HH:mm:ss Z').format('HH:mm:ss'),
                end: dayjs(bars[newIndex].endTime, 'DD-MM-YYYY HH:mm:ss Z').format('HH:mm:ss'),
                shift: shift?.id,
                background: bars[newIndex].background,
                length: bars[newIndex].length,
                parts: bars[newIndex].parts,
            }))
            }
    };

    const bar = useAppSelector(state => state.downtime)
    const {data:comments} = useGetDowntimeQuery(bar, {refetchOnMountOrArgChange: true});
    const {data:nonGreenData} = useGetDowntimeQuery({
        id: `${dayjs(barData.startTime, 'DD-MM-YYYY HH:mm:ss Z').format('DDMMYYHHmm')}${shift?.id}`,
    }, {refetchOnMountOrArgChange: true, pollingInterval:1000});

    const [barReason, setBarReason] = useState('');

    useEffect(() => {
        setBarReason(nonGreenData?.reason)
    }, [nonGreenData]);

    const Item = styled(Box)(({ theme }) => ({
        backgroundColor: color(barData.bg),
        ...theme.typography.body2,
        height: '100%',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        fontWeight: '700',
    }));

    return(
        <>
            <CommentModal
                open={open}
                setOpen={setOpen}
                handleClick = {handleClick}
                bar = {bar}
                comments = {comments}
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
                <Grid sx={{width: `${w}%`, height:'75%'}} onClick={handleOpen} component={'span'}>
                    {/*<Badge*/}
                    {/*    badgeContent=""*/}
                    {/*    color="primary"*/}
                    {/*    anchorOrigin={{*/}
                    {/*      vertical: 'bottom',*/}
                    {/*      horizontal: 'right',*/}
                    {/*    }}*/}
                    {/*>*/}
                    <Item>
                        {barData.bg !== 'bg-success' ? barReason : ''}
                    </Item>
                    {/*</Badge>*/}
                </Grid>

                {/*<div className={`d-inline-block h-100 position-relative ${barData.bg}`}*/}
                {/*     style={{width:`${w}%`}} onClick={handleOpen}>*/}
                {/*    <Typography*/}
                {/*        align={'center'}*/}
                {/*        mt={5}*/}
                {/*    >*/}
                {/*       {barData.bg !== 'bg-success' ? 'reason' : ''}*/}
                {/*    </Typography>*/}
                {/*    <span className={barData.bg === 'bg-success' ? `position-absolute top-100 start-100 translate-middle badge border border-2*/}
                {/*        border-light rounded-circle bg-dark p-1` : 'visually-hidden'}*/}
                {/*          style={{zIndex:1}}><span className="visually-hidden">x</span></span>*/}
                {/*</div>*/}
            </ProductionTooltip>
        </>
    )
};

export default TimelineBar;