import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function CalendarPicker({date}:any) {

    return (
         <ThemeProvider theme={darkTheme}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DateCalendar value={date.value} onChange={(newValue:dayjs.Dayjs | null) => date.handleDate(newValue)} />
             </LocalizationProvider>
         </ThemeProvider>
    );
}