import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setServices } from "../redux/reducers/services";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const services = useSelector((redusers) => redusers.servicesReduser.services);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const getAllServices = () => {
    axios
      .get("https://mech2u.onrender.com/services/all")
      .then((result) => {
        console.log(result.data.servecies);

        dispatch(setServices(result.data.servecies));
        console.log("gggggggg", services);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <div>
      {services?.map((ele, i) => (
        <div>
          <img src={ele.image} />
          <p>{ele.name}</p>
          <p>{ele.description}</p>
          <button id={ele.id} 
          onClick={(e)=>navigate(`/DServices/${e.target.id}`)
        }
          >
            details
            {/* on click send the id whith navigate to component details*/}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Services;
