import React from 'react'
import { apiClient } from '../../Service/api/api';
import {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";


function Order() {

    const [orders, setorders] = useState([])
    const token = useSelector((reduser)=>reduser.authReducer.token)

    const getAllOrders = async () => {
            
        try {
          const result = await apiClient.orders.getAllOrders(token)
          setorders(result.data.result);
          console.log(result.data.result);
          
          
        } catch (error) {
        console.log(error);
        
        }
      };

      useEffect(() => {
        getAllOrders();
      }, []);

    return (
    <div>
        <table>
  <tr>
    <th>id</th>
    <th>Created at</th>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Location</th>
    <th>Location</th>
    <th>date+time</th>
    <th>Cart</th>
    <th>Status</th>
    <th>Confirmation</th>
  </tr>
  {orders.map((e) => {
    return(
    <tr>
    <td>{e.ido}</td>
    <td>{e.created_at}</td>
    <td>{e.firstname} {e.lastname}</td>
    <td>{e.email}</td>
    <td>{e.phone}</td>
    <td>lat: {e.location.lat} </td>
    <td>lng: {e.location.lng} </td>
    <td>{e.date_time}</td>
    <td>{e.cart_id}</td>
    <td>{e.status}</td>
    <button>Confirm</button>
    </tr>
  )
  })}
</table>
    </div>
  )
}

export default Order