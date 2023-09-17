import ProgressBar from "./ProgressBar.tsx";
import LineOptionMenu from "./LineOptionMenu.tsx";
import { useState } from "react";
import {useAppSelector} from "../../app/hooks.ts";
import {useGetLineState} from "../../app/services/apiSplice.ts";


// @ts-ignore
const HeaderLeft = ({ data }) => {

    const lineParams = useAppSelector(state => state.line)
    const {data: idk} = useGetLineState(lineParams)
    console.log(idk)
    const {info} = useGetLineState(undefined, {
        selectFromResult: ({data}) => ({
            info: data?.find((info) => info.id === id)
        })
    })

    // SHOW PRODUCTION LINE MENU
    const [showPL, setShowPL] = useState(false);
    const handleClosePL = () => setShowPL(false);
    const handleShowPL = () => setShowPL(true);

    const infos = data.infoData
    let [total] = useState(0)

    infos.map((info: { item_count: number; }) => {
        total = total + info.item_count;
    })


    let progress = [Number((((total)/data.orderData.quantity)*100).toPrecision(4)),
        Number(((0/data.orderData.quantity)*100).toFixed(2))]

    return (
        <>
            <LineOptionMenu
                title={"Select station"}
                visibility={{
                    showPL:showPL,
                    handleClosePL:handleClosePL,
                }}
            />
        <div className="col-5">
            <div className="container py-0">
                <div className="row">
                    <div className="col-4">
                        <i className="bi bi-list" style={{fontSize: "1.5rem"}}></i>
                    </div>

                    <button type="button" className="btn col-7" onClick={handleShowPL}>
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
                            <span className=" fs-2">65%</span>
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
                        <span>{data.productData[0].part_num}</span>
                    </div>
                    <div className=" col-8">
                    </div>
                </div>
                <div className=" row pt-1">
                    <div className=" col-8 pt-1">
                        <ProgressBar progress={progress}/>
                    </div>
                    <div className=" col-4 text-end">
                        <span>{total} ({0}) / {data.orderData.quantity} pcs</span>
                    </div>
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