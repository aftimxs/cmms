import React, {useState, useEffect} from "react";

import HeaderLeft from "./HeaderLeft.tsx";
import HeaderCenter from "./HeaderCenter.tsx";
import HeaderRight from "./HeaderRight.tsx";
import * as dayjs from "dayjs";


const Header = () => {

    let current = [
        'HCF100',
        'ese'
    ];

    let previous = [
        'AG100',
        'aquel'
    ];

    //
    let [line, setLine] = useState([])

    useEffect(() => {
        getLine()
    }, [])

    let getLine = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/production-line/1/')
        let data = await response.json()
        setLine(data)
    }

    // HEADER CENTER DATA
    // SHOW SHIFT SELECTOR MENU
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // DATE SELECTOR
    const date = new Date()
    const [value, setValue] = useState(dayjs(date));
    const handleDate = (newValue:dayjs.Dayjs | null) => {
        // @ts-ignore
        setValue(newValue);
    }

    // SHIFT RADIO SELECTOR
    const [shiftSelect, setShiftSelect] = useState('1');
    const isRadioSelected = (value2:string): boolean => shiftSelect === value2;
    const handleRadio = (e:React.ChangeEvent<HTMLInputElement>): void => setShiftSelect(e.currentTarget.value)


    // SHIFT BUTTONS
    const handleBackShift = () => {
        if (shiftSelect === '1'){
            setShiftSelect('2')
            setValue(value.subtract(1, 'day'))
        } else {
            setShiftSelect('1')
        }
    }

    const handleForwardShift = () => {
        if (shiftSelect === '2'){
            setShiftSelect('1')
            setValue(value.add(1, 'day'))
        } else {
            setShiftSelect('2')
        }
    }

    const handleTodayShift = () => {
        const date = new Date()
        setValue(dayjs(date))
    }

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <HeaderLeft line={`${line.area} ${line.cell}`} pieces={250} scrap={50} total={500} current={current} previous={previous}/>
                <HeaderCenter
                    visibility={{
                        show: show,
                        handleShow: handleShow,
                        handleClose: handleClose
                    }}
                    date={{
                        value: value,
                        handleDate: handleDate
                    }}
                    shiftSelector={{
                        shiftSelect: shiftSelect,
                        isRadioSelected: isRadioSelected,
                        handleRadio: handleRadio,
                    }}
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
