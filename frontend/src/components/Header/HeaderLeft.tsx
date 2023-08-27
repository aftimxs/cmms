import ProgressBar from "./ProgressBar.tsx";
import LineOptionMenu from "./LineOptionMenu.tsx";


// @ts-ignore
const HeaderLeft = ({test, visibilityPL, lineSelector}) => {

    let progress = [((test.pieces-test.scrap)/test.total)*100, (test.scrap/test.total)*100]

    return (
        <>
            <LineOptionMenu
                title={"Select station"}
                visibilityPL={visibilityPL}
                lineSelector={lineSelector}
            />
        <div className="col-5">
            <div className="container py-0">
                <div className="row">
                    <div className="col-4">
                        <i className="bi bi-list" style={{fontSize: "1.5rem"}}></i>
                    </div>

                    <button type="button" className="btn btn-dark col-7" onClick={visibilityPL.handleShowPL}>
                    <div className="row">
                        <div className="col-2">
                            <i className="bi bi-person-workspace" style={{fontSize: "1.5rem"}}></i>
                        </div>
                        <div className=" col-10">
                            <div className=" row">
                                <span className=" titles">PRODUCTION LINE</span>
                            </div>
                            <div className=" row">
                                <span>{`${lineSelector.production[0].area} ${lineSelector.production[0].number}`}</span>
                            </div>
                        </div>
                    </div>
                    </button>

                    <div className=" col-1">
                    </div>
                </div>
            </div>

            <div className=" container py-0">
                <div className=" row">
                    <div className=" col-8">
                        <div className=" row">
                            <span className=" titles">SHIFT QUANTITY</span>
                        </div>
                        <div className=" row">
                            <span className=" fs-2">{test.pieces} pcs</span>
                        </div>
                    </div>
                    <div className=" col-4 text-center">
                        <div className=" row">
                         <span className=" titles">OEE</span>
                        </div>
                        <div className=" row">
                            <span className=" fs-2">65%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" container py-0">
                <div className=" row">
                    <span className=" titles">CURRENT BATCH</span>
                </div>
                <div className=" row">
                    <div className=" col-4">
                        <span>{test.current[0]}</span>
                    </div>
                    <div className=" col-8">
                        <span>{test.current[1]}</span>
                    </div>
                </div>
                <div className=" row pt-1">
                    <div className=" col-8 pt-1">
                        <ProgressBar progress={progress}/>
                    </div>
                    <div className=" col-4 text-end">
                        <span>{test.pieces} ({test.scrap}) / {test.total} pcs</span>
                    </div>
                </div>
            </div>

            <div className=" container py-1 pb-1">
                <div className=" row">
                    <div className=" col-3 border-bottom border-2 border-success text-center">
                        <span className=" titles">PREVIOUS</span>
                    </div>
                </div>
                <div className=" row">
                    <div className=" col-4">
                        <span>{test.previous[0]}</span>
                    </div>
                    <div className=" col-4">
                        <span>{test.previous[1]}</span>
                    </div>
                    <div className=" col-4 text-end">
                        <span>pcs</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default HeaderLeft;