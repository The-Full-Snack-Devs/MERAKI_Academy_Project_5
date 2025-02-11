import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch} from "react-redux";
import { setLogin, setUserId, setRole } from "../../Service/redux/reducers/auth";
import { apiClient } from '../../Service/api/api';


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [newlogin, setNewlogin] = useState({})
    const [Res, setRes] = useState("")


    const Login2 = async () => {
                       
        // axios.post('http://localhost:5000/users/login', newlogin)
        //   .then(function (rese) {
        //     setRes(rese.data.message)
        //     dispatch(setLogin(rese.data.token)) 
        //     dispatch(setUserId(rese.data.userId)) 
        //     navigate("/");
        //   })
        //   .catch(function (err) {
        //     console.log(err);
            
        //     setRes(err.message);
        //   });

        try {
          const result = await apiClient.users.login(newlogin)
          setRes(result.data.message)
            dispatch(setLogin(result.data.token)) 
            dispatch(setUserId(result.data.userId))
            dispatch(setRole(result.data.role))
            console.log("role",result.data.role);
            
            navigate("/");
        } catch (error) {
          console.log(error);
          setRes(error.message);
        }

        }
          return (
            <div>
              <div>
                <h2>Welcome to Mech2U</h2>
                <div>
                  <label>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newlogin.email}
                    onChange={(e) => setNewlogin({ ...newlogin, email: e.target.value })}
                  />
                </div>
        
                <div>
                  <label>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={newlogin.password}
                    onChange={(e) => setNewlogin({ ...newlogin, password: e.target.value })}
                  />
                </div>
        
                <button
                  onClick={Login2}
                >
                  Log in
                </button>
        
                {Res && (<p>{Res}</p>)}
        
                <p>
                  Don't have an account?{" "}
                  <span
                    onClick={() => navigate("/Register")}
                  >
                    Register Now!!!
                  </span>
                </p>
              </div>
            </div>
          );
    }

    export default Login;
