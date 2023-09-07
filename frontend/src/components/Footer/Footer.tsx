import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useState } from 'react';
import RestoreIcon from '@mui/icons-material/Restore';

const Footer = () => {
  
    const [value, setValue] = useState(0);

    return (
    <div className="container-fluid pt-2">
        <BottomNavigation
            sx ={{bgcolor: 'transparent'}}
            value = {value}
            onChange={(event, newValue) => {setValue(newValue)}}
        >
            <BottomNavigationAction label="x" icon={<RestoreIcon/>}/>
        </BottomNavigation>
    </div>
  )
}

export default Footer