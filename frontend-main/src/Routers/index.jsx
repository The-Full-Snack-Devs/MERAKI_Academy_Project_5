import {createBrowserRouter} from "react-router-dom"
import Main from "../layouts/Main/index.jsx"
import Home from "../pages/Home/index.jsx"
import DetailsServices from "../pages/DetailsServices/DetailsServices.jsx";
import Cart from "../pages/Cart/Cart.jsx"
import Services from "../pages/Services/index.jsx"
import TL from "../pages/Time/Location/TL.jsx"
import Register from "../pages/Register/Register.jsx"
import Login from "../pages/Login/Login.jsx"
import HowItWork from "../pages/howItWork/howItWork.jsx"
import Order from "../pages/Order/Order.jsx";
import PartDash from "../pages/PartDash/PartDash.jsx"
import Profile from "../pages/Profile/profile.jsx";
import JoinOurTeam from "../pages/JoinOurTeam/JoinOurTeam.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFound.jsx";
import AboutUs from "../pages/About/About.jsx";
import PrivacyPolicy from "../pages/PP/PP.jsx";
import ContactUs from "../pages/Contact/Contact.jsx";

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
        },{
            path: "orders",
            element: <Order/>,  
        },{
            path: "part",
            element: <PartDash/>,
        },
        {
            path: "profile",
            element: <Profile/>,
        },
        {
            path: "job",
            element: <JoinOurTeam/>,
        },
        {
            path: "aboutus",
            element: <AboutUs/>,
        },
        {
            path: "pp",
            element: <PrivacyPolicy/>,
        },
        {
            path: "contact",
            element: <ContactUs/>,
        },
        {
            path: "*",
            element: <NotFoundPage/>,
        }
    ]
}
])