import {Outlet} from "react-router-dom"
import Navbar from "../../components/NavBar"
import Footer from "../../components/Footer/Footer"



export default function Main () {
    return (
        <div>
            <header>
                <Navbar/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}