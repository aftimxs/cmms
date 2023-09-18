
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import CustomTooltip from "./CustomTooltip.tsx";
import ShiftOptionMenu from "./ShiftOptionMenu.tsx";
import * as dayjs from 'dayjs'
import {useAppSelector} from "../../app/hooks.ts";
import {useState} from "react";
import {useGetLineState} from "../../app/services/apiSplice.ts";

const HeaderCenter = () => {

    const lineParams = useAppSelector(state => state.line)

    const {production, product} = useGetLineState(lineParams, {
        selectFromResult: ({data:state}) => ({
            production: state? state['shift'][0]? state['shift'][0]['info'] : undefined : undefined,
            product: state? state['shift'][0]? state['shift'][0]['order'][0]?
                state['shift'][0]['order'][0]['products'][0] : undefined : undefined : undefined,
        })
    })

    // SHOW SHIFT SELECTOR MENU
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <ShiftOptionMenu
                visibility={{
                    show:show,
                    handleClose:handleClose,
                }}
            />

            <div className="col-5">
                <div className="container py-0">
                    <button type="button" className="btn w-100" onClick={handleShow}>
                        <div className="row">
                            <div className="col-2 text-center">
                                <i className="bi bi-calendar" style={{fontSize: "1.5rem"}}></i>
                            </div>
                            <div className="col-10">
                                <div className="row">
                                    <span className="titles">SHIFT</span>
                                </div>
                                <div className="row">
                                    <span>{`${dayjs(lineParams.date).
                                    format('dddd DD/MM/YYYY')} - Shift ${lineParams.number}`}</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                <div className="container py-0">
                    <div className="row">
                        <button type="button" className="btn col-3">
                        <div className="border-bottom border-2 border-success text-center">
                            <span className=" titles">SPEED</span>
                        </div>
                        </button>
                        <button type="button" className="btn col-3">
                        <div className="border-bottom border-2 border-success text-center">
                            <span className=" titles">OEE</span>
                        </div>
                        </button>
                    </div>

                    <div className="row">
                        <ResponsiveContainer width="100%" height={150}>
                        <LineChart
                          data={production}
                        >
                          <CartesianGrid vertical={false}/>
                          <XAxis dataKey="minute" />
                          <YAxis width={25} axisLine={false} tickCount={6} interval={0} domain={[0, 'dataMax']}/>
                          <Tooltip offset={15} wrapperClassName={"recharts-tooltip-wrapper"}
                                   content={<CustomTooltip
                                       target={((product?.rate)/60).toFixed(2)}
                                       product={product?.part_num}
                                   />}
                          />
                          <Line type="step" dataKey="item_count" dot={false} stroke="white" strokeWidth={2} />
                          <ReferenceLine y={product?.rate/60} stroke={"yellow"} strokeDasharray="3 3"/>
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderCenter;
