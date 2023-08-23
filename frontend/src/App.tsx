import Header from "./components/Header.tsx";
import Timeline from "./components/Timeline.tsx";

function App(){

    // let items = [
    //     'Hola',
    //     'caca',
    //     'alice',
    //     'fea',
    // ];
    // const handleSelectItem = (item:string) => {
    //     console.log(item)
    // }

    return (<div className="container-fluid bg-dark text-white">
                <Header/>
                <Timeline/>
            </div>);
}

export default App;