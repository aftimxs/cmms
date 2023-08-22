

const HeaderCenter = () => {
    return(
        <div className="col-5">
            <div className="container py-0">
                <div className="row">
                    <div className="col-2 text-center">
                        <i className="bi bi-calendar" style={{fontSize: "1.5rem"}}></i>
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <span className="titles">SHIFT</span>
                        </div>
                        <div className="row">
                            <span>Dia fecha - first shift</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-0">
                <div className="row">
                    <div className="col-3 border-bottom border-2 border-success rounded text-center">
                        <span className=" titles">SPEED</span>
                    </div>
                    <div className="col-3 border-bottom border-2 border-success rounded text-center">
                        <span className=" titles">OEE</span>
                    </div>
                </div>
                <div className="row">
                    Graph
                </div>
            </div>
        </div>
    );
}

export default HeaderCenter;
