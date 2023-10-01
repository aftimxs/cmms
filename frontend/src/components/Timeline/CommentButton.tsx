import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import {useDowntimeUpdatedMutation} from "../../app/services/apiSplice.ts";
import {Alert, Snackbar} from "@mui/material";
import Slide, { SlideProps } from '@mui/material/Slide';
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const CommentButton = ({comments, reasonState, setReasonState, title, setBarReason}:any) => {

    const [updateDowntime, {isSuccess}] = useDowntimeUpdatedMutation()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (isSuccess) {
        setOpen(true)
        }
    }, [isSuccess]);

    return(
        <Box>
            <Snackbar
                anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}
                sx={{height:20}}
                open={open}
                TransitionComponent={SlideTransition}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    elevation={6}
                    sx={{ width: '100%' }}
                >
                    Update Successful
                </Alert>
            </Snackbar>
            <ListItemButton
                sx={{ pl: 9 }}
                onClick={() => {
                    updateDowntime({...comments, reason: title})
                    setReasonState(title)
                    setBarReason(title)
                }}
                selected={reasonState === title}
            >
                <ListItemText primary={title} />
            </ListItemButton>
        </Box>

    )
};

export default CommentButton;