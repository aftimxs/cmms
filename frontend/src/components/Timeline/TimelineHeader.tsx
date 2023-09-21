
const TimelineHeader = () => {
    return(
        <div className="pt-2">
            <div className="row border-top">
                <div className="col-1 border-end"></div>

                <div className="col-10  ">
                    <div className="row">
                        <div className="container-fluid text-center"
                             style={{width:'81.8%',position:"absolute" ,zIndex:1}}>
                            <span>:30</span>
                        </div>
                        <div className="container w-50 text-center">
                            <span>:15</span>
                        </div>
                        <div className="container w-50 text-center">
                            <span>:45</span>
                        </div>
                    </div>
                </div>

                <div className="col-1 border-start"></div>
            </div>
        </div>
    )
};

export default TimelineHeader;