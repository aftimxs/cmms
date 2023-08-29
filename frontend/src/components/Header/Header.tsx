import React, {useState, useEffect} from "react";

import HeaderLeft from "./HeaderLeft.tsx";
import HeaderCenter from "./HeaderCenter.tsx";
import HeaderRight from "./HeaderRight.tsx";
import * as dayjs from "dayjs";

import axios from 'axios';


const Header = () => {

    let current = [
        'HCF100',
        'ese'
    ];

    let previous = [
        'AG100',
        'aquel'
    ];

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

    //
    let [shiftData, setShiftData] = useState([])
    let [lineData, setLineData] = useState([])
    let [orderData, setOrderData] = useState([{quantity:0}])
    let [productData, setProductData] = useState([{part_num: 'Not Available', rate: 0}])
    let [infoData, setInfoData] = useState([])

    useEffect(() => {
        getLine(value, shiftSelect, production)
    }, [value, shiftSelect, production])

    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      timeout: 1000,
    });

    let getLine = async (value, shiftSelect, production) => {
        try {
            let response = await instance.get('/shift', {
                params: {
                    shift_number: shiftSelect,
                    date: dayjs(value).format('YYYY-MM-DD'),
                    area: production[0].area.toLowerCase(),
                    cell: production[0].number,
                }
            })
            let data = await response.data[0]
            let data2 = await response.data[0].line[0]
            let data3 = await response.data[0].line[0].order[0]
            let data4 = await response.data[0].line[0].order[0].products
            let data5 = await response.data[0].line[0].info

            setShiftData(data)
            setLineData(data2)
            setOrderData(data3)
            setProductData(data4)
            setInfoData(data5)
        } catch (error) {
            if (error.name === 'TypeError') {
                let data = []
                let data2 = [{quantity:0}]
                let data3 = [{part_num: 'Not Available', rate: 0}]

                setShiftData(data)
                setLineData(data);
                setOrderData(data2)
                setProductData(data3)
                setInfoData(data)
            }
        }
    }


    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <HeaderLeft
                    test = {{
                        line: 1,
                        pieces: 250,
                        scrap: 0,
                        total: 500,
                        current: {current},
                        previous: {previous},
                    }}
                    data = {{
                        shiftData: shiftData,
                        lineData: lineData,
                        orderData: orderData,
                        productData: productData,
                        infoData: infoData,
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
