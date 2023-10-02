import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";


const CommentButton = ({info, reasonState, setReasonState, title, update}:any) => {

    return(
        <Box>
            <ListItemButton
                sx={{ pl: 9 }}
                onClick={() => {
                    update({...info, reason: title})
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