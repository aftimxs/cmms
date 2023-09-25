import Header from "./components/Header/Header.tsx";
import Timeline from "./components/Timeline/Timeline.tsx";
import Footer from "./components/Footer/Footer.tsx";
import React, {useEffect, useState} from "react";
import {barsReset} from "./features/barsSlice.ts";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {useGetLineQuery} from "./app/services/apiSplice.ts";


function App(){

    const dispatch = useAppDispatch()

    const lineParams = useAppSelector(state => state.line)

    const {data} = useGetLineQuery(
           {
               area:lineParams.area,
               cell:lineParams.cell,
               date:lineParams.date,
               number:lineParams.number
           }, {pollingInterval:30000}
    );

    // GET INFO EVERY MINUTE
    //useEffect(() => {
    //    dispatch(barsReset())
    //}, [lineParams])


    return (<div className="container-fluid" >
                <Header/>
                <Timeline/>
                <Footer/>
            </div>);
}

export default App;