import {useMemo} from "react";
import {useAppSelector} from "../../app/hooks.ts";
import {useGetLineState} from "../../app/services/apiSplice.ts";
import _ from "lodash";

const TimelineRight = ({ hour } : any) => {

    const lineParams = useAppSelector(state => state.line)

     const { shift, product, production} = useGetLineState(lineParams, {
        selectFromResult: ({data:state}) => ({
            shift: state? state['shift'][0] : undefined,
            product: state? state['shift'][0]? state['shift'][0]['order'][0]?
                state['shift'][0]['order'][0]['products'][0] : {rate:0} : {rate:0} : {rate:0},
            production: state? state['shift'][0]? _.groupBy(state['shift'][0]['info'], 'hour')[hour] : undefined : undefined,
        })
    })

    const total = () => {
        let counter = 0;
        production?.map((info:any) => {
            counter = counter + info.item_count
        })
        return counter;
    }
    const partsMade = useMemo(() => total(), [shift])


    return(
        <div className="col-1 text-center">
            <div className="row h-100 align-items-center border-start">
                <span>{`${partsMade}/${product?.rate}`}</span>
            </div>
        </div>
    )
}

export default TimelineRight;
