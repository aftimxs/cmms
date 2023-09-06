/* eslint-disable @typescript-eslint/no-explicit-any */
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

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

const BarTooltip = ({ type, bg, data }:any) => { 
    
    let header = '';
    let start = '';
    let time = 0;
    const product = data.product;
    let quantity = 0;
    let startMin = 0;
    let endMin = 0;

    if (type === 'bg-success'){
        header = 'Production Signal'
        start = dayjs(bg.minute).format('HH:mm')
        quantity = bg.parts

    } else {
        startMin = dayjs(bg.startTime).minute();
        endMin = dayjs(bg.minute).minute();
        start = dayjs(bg.startTime).format('HH:mm')
        time = (endMin-startMin+1)
        quantity = Number(-((data.rate*bg.long)-bg.parts).toFixed(2))
        
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


const TimelineBar = ({bg, data}:any) => {
    const w = bg.long * 1.6665
    
    return(
        <ProductionTooltip
            title={
                <BarTooltip type={bg.bg} bg={bg} data={data}></BarTooltip>
            }
            enterDelay={200} leaveDelay={100}
            arrow
        >
            <div className={`d-inline-block h-100 position-relative ${bg.bg}`} style={{width:`${w}%`}}>  
                <span className={bg.bg === 'bg-success' ? `position-absolute top-100 start-100 translate-middle badge border border-2
                    border-light rounded-circle bg-dark p-1` : 'visually-hidden'}
                      style={{zIndex:1}}><span className="visually-hidden">x</span></span>

            </div>
        </ProductionTooltip>
    )
};

export default TimelineBar;