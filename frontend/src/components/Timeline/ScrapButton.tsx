import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";


const ScrapButton = ({scrap, updateScrap, scrapReasonState, setScrapReasonState, title}:any) => {

    return(
        <ListItemButton
            sx={{ pl: 9 }}
            onClick={() => {
                updateScrap({...scrap, reason: title})
                setScrapReasonState(title)
            }}
            selected={scrapReasonState === title}
        >
            <ListItemText primary={title} />
        </ListItemButton>
    )
};

export default ScrapButton;