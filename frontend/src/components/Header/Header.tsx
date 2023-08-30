import {useState} from "react";

import HeaderLeft from "./HeaderLeft.tsx";
import HeaderCenter from "./HeaderCenter.tsx";
import HeaderRight from "./HeaderRight.tsx";
import dayjs from "dayjs";


const Header = ({ dt, shift, data, lineSelector }:any) => {

    // HEADER CENTER
    // SHOW SHIFT SELECTOR MENU
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // HEADER RIGHT
    // SHIFT BUTTONS
    const handleBackShift = () => {
        if (shift.shiftSelect === '1'){
            shift.setShiftSelect('2')
            dt.setValue(dt.value.subtract(1, 'day'))
        } else {
            shift.setShiftSelect('1')
        }
    }

    const handleForwardShift = () => {
        if (shift.shiftSelect === '2'){
            shift.setShiftSelect('1')
            dt.setValue(dt.value.add(1, 'day'))
        } else {
            shift.setShiftSelect('2')
        }
    }

    const handleTodayShift = () => {
        const date = new Date()
        dt.setValue(dayjs(date))
    }

    // HEADER LEFT
    // SHOW PRODUCTION LINE MENU
    const [showPL, setShowPL] = useState(false);
    const handleClosePL = () => setShowPL(false);
    const handleShowPL = () => setShowPL(true);


    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <HeaderLeft
                    test = {{
                        line: 1,
                        pieces: 250,
                        scrap: 0,
                        total: 500,
                    }}
                    data = {data}
                    visibilityPL={{
                        showPL: showPL,
                        handleShowPL: handleShowPL,
                        handleClosePL: handleClosePL
                    }}
                    lineSelector = {lineSelector}
                />
                <HeaderCenter
                    visibility={{
                        show: show,
                        handleShow: handleShow,
                        handleClose: handleClose
                    }}
                    date={dt}
                    shiftSelector={shift}
                    data = {data}
                />
                <HeaderRight
                    shiftButtons={{
                        handleBackShift: handleBackShift,
                        handleForwardShift: handleForwardShift,
                        handleTodayShift: handleTodayShift,
                    }}
                />
            </div>
        </div>
    );
}

export default Header;