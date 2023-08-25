
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import CustomTooltip from "./CustomTooltip.tsx";
import {useState} from "react";
import ShiftOptionMenu from "./ShiftOptionMenu.tsx";
import * as dayjs from 'dayjs'

const HeaderCenter = () => {

    const data = [
  {
    name: '6 am',
    uv: 1,
  },
  {
    name: '7 am',
    uv: 1,
  },
  {
    name: '8 am',
    uv: 0,
  },
  {
    name: '9 am',
    uv: .75,
  },
  {
    name: '10am',
    uv: 1,
  },
  {
    name: '11 am',
    uv: 1,
  },
  {
    name: '12 pm',
    uv: .5,
  },
];

    // SHOW SHIFT SELECTOR
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

    const [shiftSelect, setShiftSelect] = useState()
    console.log(shiftSelect)
    return(
        <>
            <ShiftOptionMenu
                title={"Select date and shift"}
                visibility={{
                    show: show,
                    handleClose: handleClose
                }}
                date={{
                    value: value,
                    handleDate: handleDate
                }}
                shiftSelector={{
                    shiftSelect: shiftSelect,
                    setShiftSelect: setShiftSelect
                }}
            />

            <div className="col-5">
                <div className="container py-0">
                    <button type="button" className="btn btn-dark" onClick={handleShow}>
                        <div className="row">
                            <div className="col-2 text-center">
                                <i className="bi bi-calendar" style={{fontSize: "1.5rem"}}></i>
                            </div>
                            <div className="col-10">
                                <div className="row">
                                    <span className="titles">SHIFT</span>
                                </div>
                                <div className="row">
                                    <span>{`${dayjs(value).format('dddd DD/MM/YYYY')} - ${shiftSelect} shift`}</span>
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
                          data={data}
                        >
                          <CartesianGrid vertical={false}/>
                          <XAxis dataKey="name" />
                          <YAxis width={25} axisLine={false} tickCount={6} interval={0}/>
                          <Tooltip offset={15} wrapperClassName={"recharts-tooltip-wrapper"}
                                   content={<CustomTooltip time={'6am'} made={1} target={1} product={'HCF100'}/>} />
                          <Line type="step" dataKey="uv" dot={false} stroke="white" strokeWidth={2} />
                          <ReferenceLine y={1} stroke={"yellow"} strokeDasharray="3 3"/>
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderCenter;
