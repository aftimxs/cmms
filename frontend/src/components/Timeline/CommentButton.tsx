import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import {useDowntimeUpdatedMutation} from "../../app/services/apiSplice.ts";
import Box from "@mui/material/Box";


const CommentButton = ({comments, reasonState, setReasonState, title}:any) => {

    const [updateDowntime] = useDowntimeUpdatedMutation()

    return(
        <Box>
            <ListItemButton
                sx={{ pl: 9 }}
                onClick={() => {
                    updateDowntime({...comments, reason: title})
                    setReasonState(title)
                }}
                selected={reasonState === title}
            >
                <ListItemText primary={title} />
            </ListItemButton>
        </Box>

    )
};

export default CommentButton;