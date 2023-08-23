import Hour from "./Hour.tsx";


const HeaderRight = () => {
    return (
        <div className="col-2">
            <div className="container py-0">
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col-4">
                            <button type="button" className="btn btn-dark"><i className="bi bi-chevron-left"
                                                                              style={{fontSize: "1.5rem"}}></i></button>
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn btn-dark"><i className="bi bi-chevron-right"
                                                                              style={{fontSize: "1.5rem"}}></i></button>
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn btn-dark"><i className="bi bi-chevron-double-right"
                                                                              style={{fontSize: "1.5rem"}}></i></button>
                        </div>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <button type="button" className="btn btn-dark"><i className="bi bi-gear-fill"
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