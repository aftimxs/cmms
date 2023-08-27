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

    // SHOW PRODUCTION LINE MENU
    const [showPL, setShowPL] = useState(false);
    const handleClosePL = () => setShowPL(false);
    const handleShowPL = () => setShowPL(true);

    //
    const [production, setProduction] = useState([{id: '1', number: '1', area: 'Welding'}])
    const isButtonSelected = (x:[]): boolean => production === x;
    const handlePL = (e): void => {
        const newProduction = production.map(production => {
            let eSplit = e.currentTarget.value.split(",");
            return {
                ...production,
                id: eSplit[0],
                number: eSplit[1],
                area: eSplit[2],
            };
        });
        setProduction(newProduction)
    }

    const lines = [
        {id:'1', number:'1', area:'Welding'},
        {id:'2', number:'10', area:'Welding'},
        {id:'3', number:'11', area:'Welding'},
        {id:'4', number:'1', area:'Molding'},
        {id:'5', number:'2', area:'Molding'},
        {id:'6', number:'3', area:'Molding'},
        {id:'7', number:'4', area:'Molding'},
        {id:'8', number:'5', area:'Molding'},
    ]



    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <HeaderLeft
                    test = {{
                        line: 1,
                        pieces: 250,
                        scrap: 50,
                        total: 500,
                        current: {current},
                        previous: {previous},
                    }}
                    visibilityPL={{
                        showPL: showPL,
                        handleShowPL: handleShowPL,
                        handleClosePL: handleClosePL
                    }}
                    lineSelector = {{
                        production: production,
                        isButtonSelected: isButtonSelected,
                        handlePL: handlePL,
                        lines: lines,
                    }}
                />
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
