
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import CustomTooltip from "./CustomTooltip.tsx";
import ShiftOptionMenu from "./ShiftOptionMenu.tsx";
import * as dayjs from 'dayjs'

const HeaderCenter = ({visibility, date, shiftSelector, data}:any) => {

    return(
        <>
            <ShiftOptionMenu
                title={"Select date and shift"}
                visibility={visibility}
                date={date}
                shiftSelector={shiftSelector}
            />

            <div className="col-5">
                <div className="container py-0">
                    <button type="button" className="btn btn-dark w-100" onClick={visibility.handleShow}>
                        <div className="row">
                            <div className="col-2 text-center">
                                <i className="bi bi-calendar" style={{fontSize: "1.5rem"}}></i>
                            </div>
                            <div className="col-10">
                                <div className="row">
                                    <span className="titles">SHIFT</span>
                                </div>
                                <div className="row">
                                    <span>{`${dayjs(date.value).format('dddd DD/MM/YYYY')} - Shift ${shiftSelector.shiftSelect}`}</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                <div className="container py-0">
                    <div className="row">
                        <button type="button" className="btn btn-dark col-3">
                        <div className="border-bottom border-2 border-success text-center">
                            <span className=" titles">SPEED</span>
                        </div>
                        </button>
                        <button type="button" className="btn btn-dark col-3">
                        <div className="border-bottom border-2 border-success text-center">
                            <span className=" titles">OEE</span>
                        </div>
                        </button>
                    </div>

                    <div className="row">
                        <ResponsiveContainer width="100%" height={150}>
                        <LineChart
                          data={data.infoData}
                        >
                          <CartesianGrid vertical={false}/>
                          <XAxis dataKey="minute" />
                          <YAxis width={25} axisLine={false} tickCount={6} interval={0} domain={[0, 'dataMax']}/>
                          <Tooltip offset={15} wrapperClassName={"recharts-tooltip-wrapper"}
                                   content={<CustomTooltip
                                       target={((data.productData[0].rate)/60).toFixed(2)}
                                       product={data.productData[0].part_num}
                                   />}
                          />
                          <Line type="step" dataKey="item_count" dot={false} stroke="white" strokeWidth={2} />
                          <ReferenceLine y={data.productData[0].rate/60} stroke={"yellow"} strokeDasharray="3 3"/>
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderCenter;
