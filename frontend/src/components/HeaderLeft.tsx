import ProgressBar from "./ProgressBar.tsx";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

interface Props {
    line: string;
    pieces: number;
    scrap: number;
    total: number;
    current: string[];
    previous: string[];
}

const HeaderLeft = ( {line, pieces, scrap, total, current, previous}:Props ) => {

    let progress = [((pieces-scrap)/total)*100, (scrap/total)*100]

    return (
        <div className="col-5">
            <div className="container py-0">
            <div className="row">
                <div className="col-4">
                    logo
                </div>
                <div className="col-6">
                    <div className="row">
                        <span className="titles">PRODUCTION LINE</span>
                    </div>
                    <div className="row">
                        <span>{line}</span>
                    </div>
                </div>
                <div className="col-2">

                </div>
            </div>
            </div>

            <div className="container py-0">
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <span className="titles">SHIFT QUANTITY</span>
                        </div>
                        <div className="row">
                            <span className="fs-2">{pieces} pcs</span>
                        </div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="row">
                         <span className="titles">OEE</span>
                        </div>
                        <div className="row">
                            <span className="fs-2">65%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-0">
                <div className="row">
                    <span className="titles">CURRENT BATCH</span>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span>{current[0]}</span>
                    </div>
                    <div className="col-8">
                        <span>{current[1]}</span>
                    </div>
                </div>
                <div className="row pt-1">
                    <div className="col-8 pt-1">
                        <ProgressBar progress={progress}/>
                    </div>
                    <div className="col-4 text-end">
                        <span>{pieces} ({scrap}) / {total} pcs</span>
                    </div>
                </div>
            </div>

            <div className="container py-0 pb-1">
                <div className="row">
                    <div className="col-3 border-bottom border-2 border-success rounded text-center">
                        <span className="titles">PREVIOUS</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span>{previous[0]}</span>
                    </div>
                    <div className="col-4">
                        <span>{previous[1]}</span>
                    </div>
                    <div className="col-4 text-end">
                        <span>pcs</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderLeft;