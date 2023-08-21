import ProgressBar from "./ProgressBar.tsx";

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
        <div className="col-5 border border-danger">
            <div className="row">
                <div className="col-3">
                    logo
                </div>
                <div className="col-7">
                    <div className="row">
                        PRODUCTION LINE
                    </div>
                    <div className="row">
                        {line}
                    </div>
                </div>
                <div className="col-2">

                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        Shift Quantity
                    </div>
                    <div className="row">
                        {pieces} pcs
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">
                        OEE
                    </div>
                    <div className="row">
                        65%
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="row">
                    Current Batch
                </div>
                <div className="row">
                    <div className="col-4">
                        {current[0]}
                    </div>
                    <div className="col-8">
                        {current[1]}
                    </div>
                </div>
                <div className="row">
                    <div className="col-7">
                        <ProgressBar progress={progress}/>
                    </div>
                    <div className="col-5">
                        {pieces} ({scrap}) / {total} pcs
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="row">
                    <div className="col-4">
                        Previous
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        {previous[0]}
                    </div>
                    <div className="col-6">
                        {previous[1]}
                    </div>
                    <div className="col-3">
                        pieces
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderLeft;