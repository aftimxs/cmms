import Header from "./components/Header/Header.tsx";
import Timeline from "./components/Timeline/Timeline.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {useGetLineQuery} from "./app/services/apiSplice.ts";


function App(){

    const lineParams = useAppSelector(state => state.line)

    const {} = useGetLineQuery(
           {
               area:lineParams.area,
               cell:lineParams.cell,
               date:lineParams.date,
               number:lineParams.number
           }, {pollingInterval:30000}
    );

    return (<div className="container-fluid" >
                <Header/>
                <Timeline/>
                <Footer/>
            </div>);
}

export default App;