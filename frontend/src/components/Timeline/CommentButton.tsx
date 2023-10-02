import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";


const CommentButton = ({comments, reasonState, setReasonState, title, updateDowntime}:any) => {

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