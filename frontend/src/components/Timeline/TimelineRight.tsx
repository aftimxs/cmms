
const TimelineRight = ({ data } : any) => {
    console.log()
    return(
        <div className="col-1 text-center">
            <div className="row h-100 align-items-center">
                <span>{`x/${data.productData[0].rate}`}</span>
            </div>
        </div>
    )
}

export default TimelineRight;
