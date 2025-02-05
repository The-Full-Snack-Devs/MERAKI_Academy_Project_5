import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setServices } from "../redux/reducers/services";

const Services = () => {
  const services = useSelector((redusers) => redusers.servicesReduser.services);

  const dispatch = useDispatch();
  const getAllServices = () => {
    axios
      .get("http://localhost:5000/services/all")
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
          <button id={ele.id}>
            details
            {/* on click send the id whith navigate to component details*/}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Services;
