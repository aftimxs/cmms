import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";


const CommentButton = ({comments, updateDowntime, reasonState, setReasonState, title, setBarReason}:any) => {

    return(
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
    )
};

export default CommentButton;