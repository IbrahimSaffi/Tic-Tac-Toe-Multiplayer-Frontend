import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import Game from "./Components/Game"
import Start from "./Components/Start"
import './style.css'
ReactDOM.render(
    <BrowserRouter>
    <Start/>
    </BrowserRouter>
    ,
    document.getElementById('root')
)