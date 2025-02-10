import {createBrowserRouter} from "react-router-dom"
import Main from "../layouts/Main"
import Home from "../pages/Home"
import DetailsServices from "../pages/DetailsServices/DetailsServices";
import Cart from "../pages/Cart/Cart"
import Services from "../pages/Services/index.jsx"
import TL from "../pages/Time/Location/TL"
import Register from "../pages/Register/Register"
import Login from "../pages/Login/Login"
import HowItWork from "../pages/howItWork/howItWork.jsx"
import PartDash from "../pages/PartDash/PartDash"


export const router = createBrowserRouter([
{
    path: "/",
    element: <Main/>,
    children:[
        {
            path: "",
            element: <Home/>,  
        },
        {
            path: "Services",
            element: <Services/>,  
        },{
            path: "DServices/:id",
            element: <DetailsServices/>,  
        },{
            path: "Cart",
            element: <Cart/>,  
        },{
            path: "TL",
            element: <TL/>,  
        },{
            path: "Register",
            element: <Register/>,  
        },{
            path: "login",
            element: <Login/>,  
        },{
            path: "HIW",
            element: <HowItWork/>,  
        },
        {
            path: "/parts",
            element: <PartDash/>
        },
    ]
}
])