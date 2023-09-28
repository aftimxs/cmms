import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import {useDowntimeUpdatedMutation} from "../../app/services/apiSplice.ts";
import {Snackbar} from "@mui/material";
import Box from "@mui/material/Box";


const CommentButton = ({comments, reasonState, setReasonState, title, setBarReason}:any) => {

    const [updateDowntime, {isSuccess}] = useDowntimeUpdatedMutation()

    //const [open, setOpen] = useState(isSuccess)

    return(
        <Box>
            {/*<Snackbar*/}
            {/*    anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}*/}
            {/*    open={isSuccess}*/}
            {/*    autoHideDuration={6000}*/}
            {/*    onClose={false}*/}
            {/*    message="Update Successful"*/}
            {/*/>*/}
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