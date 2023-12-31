import ProgressBar from "./ProgressBar.tsx";
import LineOptionMenu from "./LineOptionMenu.tsx";
import { useState } from "react";
import {useAppSelector} from "../../app/hooks.ts";
import {
    useGetAllScrapQuery,
    useGetLineState,
    useGetProductQuery,
} from "../../app/services/apiSplice.ts";
import Tooltip from "@mui/material/Tooltip";
import {skipToken} from "@reduxjs/toolkit/query";


// @ts-ignore
const HeaderLeft = () => {

    const lineParams = useAppSelector(state => state.line)

    const {shift, quantity, productID} = useGetLineState(lineParams, {
        selectFromResult: ({currentData:state}) => ({
            shift: state? state['shift'][0] : undefined,
            quantity: state? state['shift'][0]? state['shift'][0]['order'][0]? state['shift'][0]['order'][0]['quantity']
                : 0 : 0 : 0,
            productID: state? state['shift'][0]? state['shift'][0]['order'][0]?
                state['shift'][0]['order'][0]['product'] : undefined : undefined : undefined,
        })
    })

    const {currentData:product} = useGetProductQuery(productID ? {id:productID} : skipToken);
    const {currentData:scrap} = useGetAllScrapQuery(shift ? shift?.id : skipToken);

    // SHOW PRODUCTION LINE MENU
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    let [total] = useState(0)

    shift?.info.map((info: { item_count: number; }) => {
        total = total + info.item_count;
    })

    let [totalScrap] = useState(0)

    scrap?.map((scr: { pieces: number; }) => {
        totalScrap = totalScrap + scr.pieces;
    })

    let progress = [Number((((total-totalScrap)/quantity)*100).toPrecision(4)),
        Number(((totalScrap/quantity)*100).toFixed(2))]

    return (
        <>
            <LineOptionMenu
                open={open}
                setOpen={setOpen}
            />
        <div className="col-5">
            <div className="container py-0">
                <div className="row">
                    <div className="col-4">
                        <i className="bi bi-list" style={{fontSize: "1.5rem"}}></i>
                    </div>

                    <Tooltip title={'Select production line'}>
                        <button type="button" className="btn col-7" onClick={handleOpen}>
                        <div className="row">
                            <div className="col-2">
                                <i className="bi bi-person-workspace" style={{fontSize: "1.5rem"}}></i>
                            </div>
                            <div className=" col-10">
                                <div className=" row">
                                    <span className=" titles">PRODUCTION LINE</span>
                                </div>
                                <div className=" row">
                                    <span>{`${lineParams.area} ${lineParams.cell}`}</span>
                                </div>
                            </div>
                        </div>
                        </button>
                    </Tooltip>

                    <div className=" col-1">
                    </div>
                </div>
            </div>

            <div className=" container py-0">
                <div className=" row">
                    <div className=" col-8">
                        <div className=" row">
                            <span className=" titles">SHIFT QUANTITY</span>
                        </div>
                        <div className=" row">
                            <span className=" fs-2">{total} pcs</span>
                        </div>
                    </div>
                    <div className=" col-4 text-center">
                        <div className=" row">
                         <span className=" titles">OEE</span>
                        </div>
                        <div className=" row">
                            <span className=" fs-2">- %</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" container py-0">
                <div className=" row">
                    <span className=" titles">CURRENT BATCH</span>
                </div>
                <div className=" row">
                    <div className=" col-4">
                        <span>{product? product.part_num : 'Part N/A' }</span>
                    </div>
                    <div className=" col-8">
                    </div>
                </div>
                <div className=" row pt-1">
                    <div className=" col-8 pt-1">
                        <ProgressBar progress={progress}/>
                    </div>
                    <Tooltip title={'Made (Scrap) / Total'}>
                        <div className=" col-4 text-end">
                            <span>{total} <span style={{color:'#ffc107'}}>({totalScrap})</span> / {quantity} pcs</span>
                        </div>
                    </Tooltip>
                </div>
            </div>

            <div className=" container py-1 pb-1">
                <div className=" row">
                    <div className=" col-3 border-bottom border-2 border-success text-center">
                        <span className=" titles">PREVIOUS</span>
                    </div>
                </div>
                <div className=" row">
                    <div className=" col-4">
                        {/*<span>{test.previous[0]}</span>*/}
                    </div>
                    <div className=" col-4">
                        {/*<span>{test.previous[1]}</span>*/}
                    </div>
                    <div className=" col-4 text-end">
                        <span>pcs</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default HeaderLeft;