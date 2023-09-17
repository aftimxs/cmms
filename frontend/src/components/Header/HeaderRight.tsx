import Hour from "./Hour.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {dateAdded, numberAdded} from "../../features/lineParamsSlice.ts";
import dayjs from "dayjs";


// @ts-ignore
const HeaderRight = () => {

    const dispatch = useAppDispatch()
    const lineParams = useAppSelector(state => state.line)

    // SHIFT BUTTONS
    const handleBackShift = () => {
        if (lineParams.number === '1'){
            const newDate = dayjs(lineParams.date).subtract(1, 'day')
            dispatch(numberAdded('2'))
            dispatch(dateAdded(dayjs(newDate).format('YYYY-MM-DD')))
        } else {
            dispatch(numberAdded('1'))
        }
    }

    const handleForwardShift = () => {
        if (lineParams.number === '2'){
            const newDate = dayjs(lineParams.date).add(1, 'day')
            dispatch(numberAdded('1'))
            dispatch(dateAdded(dayjs(newDate).format('YYYY-MM-DD')))
        } else {
            dispatch(numberAdded('2'))
        }
    }

    const handleTodayShift = () => {
        dispatch(dateAdded(dayjs().format('YYYY-MM-DD')))
    }

    return (
        <div className="col-2">
            <div className="container py-0">
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col-4">
                            <button type="button" className="btn" onClick={handleBackShift}>
                                <i className="bi bi-chevron-left" style={{fontSize: "1.5rem"}}></i></button>
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn" onClick={handleForwardShift}>
                                <i className="bi bi-chevron-right" style={{fontSize: "1.5rem"}}></i></button>
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn" onClick={handleTodayShift}>
                                <i className="bi bi-chevron-double-right" style={{fontSize: "1.5rem"}}></i></button>
                        </div>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <button type="button" className="btn"><i className="bi bi-gear-fill"
                                                                      style={{fontSize: "1.5rem"}}></i></button>
                </div>
            </div>
            </div>
            <div className="row align-items-center pt-2">
                    <Hour/>
            </div>
            <div className="col pt-3 text-center">
                <img src="./src/assets/ag.png" alt="AG" className="img-fluid" style={{maxWidth: "100px"}}/>
            </div>
        </div>
    );
}

export default HeaderRight;