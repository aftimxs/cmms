import {useMemo} from "react";

const TimelineRight = ({ data } : any) => {

    const total = () => {
        let counter = 0;
        data.infoData.map((info:any) => {
            counter = counter + info.item_count
        })
        return counter;
    }
    const partsMade = useMemo(() => total(), [data])


    return(
        <div className="col-1 text-center">
            <div className="row h-100 align-items-center">
                <span>{`${partsMade}/${data.productData[0].rate}`}</span>
            </div>
        </div>
    )
}

export default TimelineRight;
