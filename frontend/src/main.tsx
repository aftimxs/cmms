import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Provider } from 'react-redux';
import { store } from './app/store';
import {enableMapSet} from "immer"

enableMapSet()


ReactDOM.createRoot(document.getElementById('root')!).render(
//  <React.StrictMode>
    <Provider store={store}>
            <App />
    </Provider>
//  </React.StrictMode>,
)
