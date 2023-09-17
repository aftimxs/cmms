import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {dateAdded} from "../../features/lineParamsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function CalendarPicker() {

    const dispatch = useAppDispatch()
    const lineParams = useAppSelector(state => state.line)

    return (
         <ThemeProvider theme={darkTheme}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DateCalendar value={dayjs(lineParams.date)} onChange={(newValue:dayjs.Dayjs | null) => dispatch(dateAdded(dayjs(newValue).format('YYYY-MM-DD')))} />
             </LocalizationProvider>
         </ThemeProvider>
    );
}