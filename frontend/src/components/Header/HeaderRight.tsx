import Hour from "./Hour.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {dateAdded, numberAdded} from "../../features/lineParamsSlice.ts";
import dayjs from "dayjs";
import {ButtonGroup} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import IconButton from "@mui/material/IconButton";
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import Grid from "@mui/material/Unstable_Grid2";


// @ts-ignore
const HeaderRight = () => {

    const dispatch = useAppDispatch()
    const lineParams = useAppSelector(state => state.line)

    // SHIFT BUTTONS
    const handleBackShift = () => {
        if (lineParams.number === '1'){
            const newDate = dayjs(lineParams.date).subtract(1, 'day')
            dispatch(numberAdded('2'))
            dispatch(dateAdded(dayjs(newDate).format('YYYY-MM-DD')))
        } else {
            dispatch(numberAdded('1'))
        }
    }

    const handleForwardShift = () => {
        if (lineParams.number === '2'){
            const newDate = dayjs(lineParams.date).add(1, 'day')
            dispatch(numberAdded('1'))
            dispatch(dateAdded(dayjs(newDate).format('YYYY-MM-DD')))
        } else {
            dispatch(numberAdded('2'))
        }
    }

    const handleTodayShift = () => {
        dispatch(dateAdded(dayjs().format('YYYY-MM-DD')))
    }

    return (
        <Grid container xs={2} direction={'column'} alignItems={'center'} px={0}>
            <Grid>
                <ButtonGroup
                    variant="text"
                    disableElevation
                    fullWidth
                >
                    <IconButton onClick={handleBackShift}> <ChevronLeftIcon sx={{color:'#e3f2fd'}} fontSize="large"/> </IconButton>
                    <IconButton onClick={handleForwardShift}> <ChevronRightIcon sx={{color:'#e3f2fd'}} fontSize="large"/> </IconButton>
                    <IconButton onClick={handleTodayShift}> <LastPageIcon sx={{color:'#e3f2fd'}} fontSize="large"/> </IconButton>
                    <IconButton> <SettingsSharpIcon sx={{color:'#e3f2fd'}} fontSize="large"/> </IconButton>
                </ButtonGroup>
            </Grid>
            <Grid pt={2}>
                <Hour/>
            </Grid>
            <Grid pt={2}>
                <img src="./src/assets/ag.png" alt="AG" className="img-fluid" style={{maxWidth: "100px"}}/>
            </Grid>
        </Grid>
    );
}

export default HeaderRight;