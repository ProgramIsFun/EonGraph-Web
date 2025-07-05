import React from 'react';
import ReactDOM1 from 'react-dom';
import ReactDOM from 'react-dom/client';
import aframe from 'aframe';



import './index.css';


import App from './App';
import Wwwwwwwwww from "./test1/Wwwwwwwwww";
import Wwwwwwwwww2 from "./test1/Wwwwwwwwww2";
import Wwwwwwwwww3 from "./test1/Wwwwwwwwww3";
import { Provider } from 'react-redux';
import store from './store';



let aaaaaaaappppppppp=<React.StrictMode>
    { 0?


        [
            <Wwwwwwwwww></Wwwwwwwwww>,


            <Wwwwwwwwww2></Wwwwwwwwww2>,



            <Wwwwwwwwww3></Wwwwwwwwww3>,


            // <Wwwwwwwwww4></Wwwwwwwwww4>,


        ][0]

        :

        <Provider store={store}>
                <App/>
        </Provider>





    }
</React.StrictMode>



if (0){
    ReactDOM1.render(aaaaaaaappppppppp, document.getElementById('root'));
}else {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        aaaaaaaappppppppp
    );


}

