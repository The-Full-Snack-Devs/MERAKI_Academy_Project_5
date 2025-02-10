import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../Service/redux/reducers/auth"


const Navbar = () => {

const navigate = useNavigate();
const isLoggedIn = useSelector((reducers) => reducers.authReducer.isLoggedIn);
const role = useSelector((reducers) => reducers.authReducer.Role);
const dispatch = useDispatch()


return (
  <header>
  <div className="logo flex items-center ">
    <img
      src='../src/assest/Mech2U_logo_transparent-removebg-preview.png'
      alt="Logo"
      onClick={() => navigate("/")}
    />

    <p
      onClick={() => navigate("/")}
    >
      Join Our Team
    </p>
  </div>

  <div>
    {isLoggedIn ? (
      <>
        {role === "admin" && (
        <button
          onClick={() => navigate("/orders")}
          >
          Orders
        </button>
    )}
        <button
          onClick={() => navigate("/HIW")}
        >
          How It Works
        </button>
        <button
          onClick={() => navigate("/Services")}

        >
        Our Services
        </button>
        <button
          onClick={() => navigate("/")}

        >
        Profile
        </button>
        <button
          onClick={() => navigate("/Cart")}
        >
          Cart
        </button>
        <button
          onClick={()=>{dispatch(setLogout())}}
        >
          Log Out
        </button>
      </>
    ) : (
      <>
        <button
          onClick={() => navigate("/HIW")}
       
        >
          How It Works
        </button>
        <button
          onClick={() => navigate("/Services")}
      
        >
        Our Services
        </button>
        <button
          onClick={() => navigate("/login")}
       
        >
        Log In
        </button>
      </>
    )}
  </div>
</header>    
      )
    }

    export default Navbar