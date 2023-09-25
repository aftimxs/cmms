import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Collapse from "@mui/material/Collapse";
import {useState} from "react";


const DowntimeCard = ({period}:any) => {

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton alignItems={'flex-start'} onClick={handleClick}>
                <ListItemIcon> <ArrowDownwardIcon sx={{ color:'#dc3545'}}/> </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{color: 'black'}}
                    primary={period ? `${dayjs(period.start, 'HH:mm:ss').format('h:mm a')} - ${dayjs(period.end, 'HH:mm:ss').format('h:mm a')}` : 'N/A'}
                    secondary={
                        <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                                {period ? period.reason ? period.reason : 'Uncommented' : 'Uncommented'}
                            </Typography>
                            {period ? period.description ? ` — ${period.description}` : '' : ''}
                        </>
                    }
                />
            </ListItemButton>
            <Collapse in={open} timeout={'auto'} unmountOnExit>

            </Collapse>
            <Divider component="li" />
        </>
    )
}

export default DowntimeCard;