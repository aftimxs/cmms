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

    return (
        <div className="container-fluid bg-dark text-white pt-2 border border-danger">
            <div className="row">
                <HeaderLeft line="Weld1" pieces={250} scrap={50} total={500} current={current} previous={previous}/>
                <HeaderCenter/>
                <HeaderRight/>
            </div>
        </div>
    );
}

export default Header;
