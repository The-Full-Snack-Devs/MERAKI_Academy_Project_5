import React,{useEffect} from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {setDitailsServicse} from "../redux/reducers/ditailsSevices";

const DetailServices = () => {
    const ditailsServicse = useSelector ((redusers) => redusers.detailServicesReduser.detailServices)
    const dispatch = useDispatch();
    const getAllParts = ()=> {
        axios
        .get("http://localhost:5000/part/service/2")
        .then((result) => {
                console.log(result.data.result);
        
                dispatch(setDitailsServicse(result.data.result));
              })
              .catch((error) => {
                console.log(error);
              });
    }
useEffect(() => {
    getAllParts();
  }, []);

  return (
    <div>index sdgshdgjfjhf hgf hgfh gf fd d</div>
  )
}
export default DetailServices ;