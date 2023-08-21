import Button from "./components/Button.tsx";

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

    return (<div>
                <Button
                    color="danger"
                    onClick={() => console.log('Clicked')}>
                    Hello
                </Button>
            </div>);
}

export default App;