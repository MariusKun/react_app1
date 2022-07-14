import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import userReducer from "./features/user"


const store = configureStore({
    reducer: {
        user: userReducer,
        
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>

);

reportWebVitals();