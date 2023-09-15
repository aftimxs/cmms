import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Provider } from 'react-redux';
import { store } from './app/store';
import { useAppSelector, useAppDispatch } from "./app/hooks.ts";
import {barAdded} from "./features/barsSlice.ts";
import dayjs from "dayjs";



// const dispatch = useAppDispatch();
// const x = () => dispatch(barAdded({
//     id: 1,
//     startTime: dayjs(),
//     endTime: dayjs(),
//     background: 'bg-success',
//     length: 2,
//     parts: 5,
// }))
//
// x()
//
// console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')!).render(
//  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
//  </React.StrictMode>,
)
