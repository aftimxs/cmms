import Header from "./components/Header/Header.tsx";
import Timeline from "./components/Timeline/Timeline.tsx";
import Footer from "./components/Footer/Footer.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";

import {barsReset} from "./features/barsSlice.ts";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {useGetLineQuery} from "./app/services/apiSplice.ts";



function App(){

    const dispatch = useAppDispatch()

    // BACKEND DATA RETRIEVE
    const [shiftData, setShiftData] = useState([])
    const [lineData, setLineData] = useState([])
    const [orderData, setOrderData] = useState([{quantity:0}])
    const [productData, setProductData] = useState([{part_num: 'Not Available', rate: 0}])
    const [infoData, setInfoData] = useState([])


    const lineParams = useAppSelector(state => state.line)

     const { data: shiftData2, isLoading } = useGetLineQuery(
            {
                area:lineParams.area,
                cell:lineParams.cell,
                date:lineParams.date,
                number:lineParams.number
            }, {pollingInterval:30000});


    // GET INFO EVERY MINUTE
    useEffect(() => {
        //let timer = setInterval(() => getLine({value, shiftSelect, production}), 1000)

        //return function cleanup(){
        //    clearInterval(timer)
        //}
        dispatch(barsReset())
        getLine()

    }, [lineParams])

    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      timeout: 1000,
    });



    const getLine = async () => {
        try {
            const response = await instance.get('/production-line/', {
                params: {
                    area: lineParams.area,
                    cell: lineParams.cell,
                    date: lineParams.date,
                    number: lineParams.number
                }
            })

            const data = await response.data[0]
            const data2 = await response.data[0].shift[0]
            const data3 = await response.data[0].shift[0].order[0]
            const data4 = await response.data[0].shift[0].order[0].products
            const data5 = await response.data[0].shift[0].info

            setLineData(data)
            setShiftData(data2)
            setOrderData(data3)
            setProductData(data4)
            setInfoData(data5)

        } catch (error) {
            if (error.name === 'TypeError') {
                const data: React.SetStateAction<never[]> = []
                const data2 = [{quantity:0}]
                const data3 = [{part_num: 'Not Available', rate: 0}]

                setShiftData(data)
                setLineData(data);
                setOrderData(data2)
                setProductData(data3)
                setInfoData(data)
            }
        }
    }


    return (<div className="container-fluid" >
                <Header
                    data = {{
                        shiftData: shiftData,
                        lineData: lineData,
                        orderData: orderData,
                        productData: productData,
                        infoData: infoData,
                    }}
                />
                <Timeline
                    data = {{
                        shiftData: shiftData,
                        lineData: lineData,
                        orderData: orderData,
                        productData: productData,
                        infoData: infoData,
                    }}
                />
                <Footer
                    data = {{
                        shiftData: shiftData,
                    }}
                />
            </div>);
}

export default App;