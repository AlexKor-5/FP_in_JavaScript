import React from "react"
import ReactDOM from "react-dom"
// import "./index.css"
import {MyApp} from "./MyApp/MyApp";

const destination = document.querySelector("#container")

ReactDOM.render(
    <>
        <React.StrictMode>
            <MyApp/>
        </React.StrictMode>
    </>,
    destination
)