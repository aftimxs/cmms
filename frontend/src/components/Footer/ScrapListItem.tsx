import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';



const ScrapListItem = ({item}:any) => {

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton alignItems={'flex-start'} onClick={handleClick}>
                <ListItemIcon> <DeleteIcon sx={{ color:'#ffc107'}}/> </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{color: 'black'}}
                    primary={item ? `${dayjs(item.minute, 'HH:mm:ss').format('h:mm a')} (${item.pieces} pcs)` : 'N/A'}
                    secondary={
                        <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                                {item ? item.reason ? item.reason : 'Uncommented' : 'Uncommented'}
                            </Typography>
                            {item ? item.comments ? ` — ${item.comments}` : '' : ''}
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

export default ScrapListItem;