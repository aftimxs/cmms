import {useState, useEffect} from "react";

import HeaderLeft from "./HeaderLeft.tsx";
import HeaderCenter from "./HeaderCenter.tsx";
import HeaderRight from "./HeaderRight.tsx";


const Header = () => {

    let current = [
        'HCF100',
        'ese'
    ];

    let previous = [
        'AG100',
        'aquel'
    ];

    let [line, setLine] = useState([])

    useEffect(() => {
        getLine()
    }, [])

    let getLine = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/production-line/1/')
        let data = await response.json()
        setLine(data)
    }


    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <HeaderLeft line={`${line.area} ${line.cell}`} pieces={250} scrap={50} total={500} current={current} previous={previous}/>
                <HeaderCenter/>
                <HeaderRight/>
            </div>
        </div>
    );
}

export default Header;
