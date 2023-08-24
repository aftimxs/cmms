import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface Props{
    value: dayjs.Dayjs;
    handleDate: () => void;
}

export default function CalendarPicker({value, handleDate}:Props) {

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={value} onChange={(newValue) => handleDate(newValue)} />
      </LocalizationProvider>
    );
}