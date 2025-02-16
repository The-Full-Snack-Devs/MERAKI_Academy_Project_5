import React ,{ useEffect, useState }from 'react'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setDetailsServices } from '../../Service/redux/reducers/DetailsServices';
import { useParams } from "react-router-dom";
import { apiClient } from '../../Service/api/api';
import { setCartId } from "../../Service/redux/reducers/auth";




const DetailsServices = () => {
    const { id } = useParams();
    const detailsServices =useSelector((redusers)=>redusers.DetailsServicesReduser.detailsServices)
    const dispatch=useDispatch()
    const cart_id = useSelector((redusers)=>redusers.authReducer.Cart_id)
    const token=useSelector((reduser)=>reduser.authReducer.token)

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const getServicesDetails=async ()=>{
      //  axios.get(`http://localhost:5000/part/service/${id}`, { headers })
      //   .then((result)=>{
      //     console.log(result.data.result);
      //     dispatch(setDetailsServices(result.data.result));
      //   })
      //   .catch((error)=>{
      //     console.log(error);

      //   }) 
          try {
            const result = await apiClient.part.getPartByServiceId(id, token)
            dispatch(setDetailsServices(result.data.result));
          } catch (error) {
            
          }
    }

    const profile=async ()=>{
      console.log("test");
      
      try {
        const result = await apiClient.profile.GetProfile(token)
           dispatch(setCartId(result.data.User.idc))
      } catch (error) {
        console.log(error);
      }
  }

    const addPartToCart=(id)=>{
      axios.post(`http://localhost:5000/services/addCart/${id}`,{cart_id}, {headers})
      .then((result)=>{
        console.log(result.data);
      })
      .catch((error)=>{
        console.log(error);

      })
  }

    useEffect(() => {
      getServicesDetails();
      profile()
    }, []);

  return (
    <div>
      <div>
      <img src={detailsServices[0]?.image}/>
      <h1>{detailsServices[0]?.name}</h1>
      <p>{detailsServices[0]?.description}</p>
      </div>
      <div>
      
      {detailsServices?.map((ele,ind)=>{
        return <div>
           <img src={ele.image} />
          <p>{ele.name}</p>
          <p>{ele.price}</p>
          <button onClick={()=>{addPartToCart(ele.idp)}}>Add to cart..</button>
        </div>
      })}
      </div>
    </div>
  )
}

export default DetailsServices