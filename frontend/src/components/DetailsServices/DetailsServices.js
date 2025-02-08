import React ,{ useEffect }from 'react'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setDetailsServices } from '../redux/reducers/DetailsServices';
import { useParams } from "react-router-dom";

const DetailsServices = () => {
    const { id } = useParams();

    const detailsServices =useSelector((redusers)=>redusers.DetailsServicesReduser.detailsServices)
    const dispatch=useDispatch()
    const getServicesDetails=()=>{
        axios.get(`http://localhost:5000/part/service/${id}`)
        .then((result)=>{
          console.log(result.data.result);
          dispatch(setDetailsServices(result.data.result));

          


        })
        .catch((error)=>{
          console.log(error);

        })
    }
    useEffect(() => {
      getServicesDetails();
    }, []);
  return (
    <div>
      {detailsServices?.map((ele,ind)=>{
        return <div>
           <img src={ele.image} />
          <p>{ele.name}</p>
          <p>{ele.description}</p>
          <p>{ele.price}</p>
        </div>
      })}
    </div>
  )
}

export default DetailsServices