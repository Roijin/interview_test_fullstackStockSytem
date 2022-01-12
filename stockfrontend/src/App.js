import * as React from 'react'
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import HomePage from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Stock from "./pages/Stock"
import Cart from "./pages/Cart"
import HeaderBar from "./modules/views/Header"
import AppFooter from "./modules/views/Footer"
import withRoot from './modules/withRoot';

function App(){
    return(
        <div>
        <HeaderBar/> 
            <Router>       
                <Routes>
                    <Route path="/" element={<HomePage/>} /> 
                    <Route path="SignIn" element={<SignIn/>} />
                    <Route path="SignUp" element={<SignUp/>} />
                    <Route path="Stock" element={<Stock/>} />
                    <Route path="Cart" element={<Cart/>} />
                </Routes>
            </Router>
        <AppFooter/>  
        </div>
    )
}

export default withRoot(App);