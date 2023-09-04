import Header from "./components/Header/Header.tsx";
import Timeline from "./components/Timeline/Timeline.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";


function App(){

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


    // SET PRODUCTION AREA AND CELL
    const [production, setProduction] = useState([{id: '1', number: '1', area: 'Welding'}])
    const isButtonSelected = (x:[]): boolean => production === x;
    const handlePL = (e:any): void => {
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


    // BACKEND DATA RETRIEVE
    let [shiftData, setShiftData] = useState([])
    let [lineData, setLineData] = useState([])
    let [orderData, setOrderData] = useState([{quantity:0}])
    let [productData, setProductData] = useState([{part_num: 'Not Available', rate: 0}])
    let [infoData, setInfoData] = useState([])

    // GET INFO EVERY MINUTE
    useEffect(() => {
        //let timer = setInterval(() => getLine({value, shiftSelect, production}), 1000)

        //return function cleanup(){
        //    clearInterval(timer)
        //}

        getLine({value, shiftSelect, production})

    }, [value, shiftSelect, production])

    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      timeout: 1000,
    });

    let getLine = async ({value, shiftSelect, production}:any) => {
        try {
            let response = await instance.get('/production-line/', {
                params: {
                    area: production[0].area,
                    cell: production[0].number,
                    date: dayjs(value).format('YYYY-MM-DD'),
                    shift_number: shiftSelect
                }
            })
            let data = await response.data[0]
            let data2 = await response.data[0].shift[0]
            let data3 = await response.data[0].shift[0].order[0]
            let data4 = await response.data[0].shift[0].order[0].products
            let data5 = await response.data[0].shift[0].info

            setLineData(data)
            setShiftData(data2)
            setOrderData(data3)
            setProductData(data4)
            setInfoData(data5)

        } catch (error) {
            // @ts-ignore
            if (error.name === 'TypeError') {
                let data:any = []
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

    return (<div className="container-fluid bg-dark text-white">
                <Header
                    dt = {{
                        value:value,
                        setValue: setValue,
                        handleDate: handleDate,
                    }}
                    shift = {{
                        shiftSelect: shiftSelect,
                        setShiftSelect: setShiftSelect,
                        isRadioSelected: isRadioSelected,
                        handleRadio: handleRadio,
                    }}
                    data = {{
                        shiftData: shiftData,
                        lineData: lineData,
                        orderData: orderData,
                        productData: productData,
                        infoData: infoData,
                    }}
                    lineSelector = {{
                        production: production,
                        isButtonSelected: isButtonSelected,
                        handlePL: handlePL,
                        lines: lines,
                    }}
                />
                <Timeline
                    shiftSelect ={shiftSelect}
                    data = {{
                        shiftData: shiftData,
                        lineData: lineData,
                        orderData: orderData,
                        productData: productData,
                        infoData: infoData,
                    }}
                />
            </div>);
}

export default App;