import HeaderLeft from "./HeaderLeft.tsx";
import HeaderCenter from "./HeaderCenter.tsx";
import HeaderRight from "./HeaderRight.tsx";


const Header = ({ data }:any) => {

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <HeaderLeft
                    data = {data}
                />
                <HeaderCenter
                    data = {data}
                />
                <HeaderRight/>
            </div>
        </div>
    );
}

export default Header;