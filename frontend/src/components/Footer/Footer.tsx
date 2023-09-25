import { BottomNavigation } from '@mui/material'
import BottomNavigationAction, {BottomNavigationActionProps} from "@mui/material/BottomNavigationAction";
import { useState } from 'react';
import {ThemeProvider, createTheme, styled} from '@mui/material/styles';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CancelIcon from '@mui/icons-material/Cancel';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SpeedIcon from '@mui/icons-material/Speed';
import OperatorModal from "./OperatorModal.tsx";
import OrderModal from "./OrderModal.tsx";
import DowntimeModal from "./DowntimeModal.tsx";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const LongNavItem = styled(BottomNavigationAction)<BottomNavigationActionProps>(() => ({
    maxWidth: '100%',
    height: '60px',
    paddingBottom: '10px'
}));

const Footer = () => {

    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    return (
        <>
            <OperatorModal
                open={open}
                setOpen={setOpen}
                value={value}
            />
            <OrderModal
                open={open}
                setOpen={setOpen}
                value={value}
            />
            <DowntimeModal
                open={open}
                setOpen={setOpen}
                value={value}
            />
            <ThemeProvider theme={darkTheme}>
                <div className="container-fluid pt-2">
                    <BottomNavigation
                        sx ={{
                            bgcolor: 'transparent',
                        }}
                        showLabels
                        value = {value}
                        onChange={(_event, newValue) => {setValue(newValue)}}
                    >
                        <LongNavItem label="Operators" icon={<EngineeringIcon/>} onClick={() => setOpen(true)}/>
                        <LongNavItem label="Order" icon={<ChangeCircleIcon/>} onClick={() => setOpen(true)}/>
                        <LongNavItem label="Downtime" icon={<CancelIcon/>} onClick={() => setOpen(true)}/>
                        <LongNavItem label="Speed Loss" icon={<SpeedIcon/>}/>
                        <LongNavItem label="Scrap" icon={<DoDisturbOnIcon/>}/>
                    </BottomNavigation>
                </div>
            </ThemeProvider>
        </>
    )
}

export default Footer