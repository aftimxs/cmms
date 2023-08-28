import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


// @ts-ignore
export default function CalendarPicker({date}) {

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={date.value} onChange={(newValue:dayjs.Dayjs | null) => date.handleDate(newValue)} />
      </LocalizationProvider>
    );
}