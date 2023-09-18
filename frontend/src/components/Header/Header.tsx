import HeaderLeft from "./HeaderLeft.tsx";
import HeaderCenter from "./HeaderCenter.tsx";
import HeaderRight from "./HeaderRight.tsx";


const Header = () => {

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <HeaderLeft/>
                <HeaderCenter/>
                <HeaderRight/>
            </div>
        </div>
    );
}

export default Header;