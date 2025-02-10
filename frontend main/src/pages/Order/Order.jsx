import React from 'react'
import { apiClient } from '../../Service/api/api';
import {useState, useEffect} from "react";

function Order() {

    const [orders, setorders] = useState([])

    const getAllOrders = async () => {
            
        try {
          const result = await apiClient.orders.getAllOrders()
          console.log(result);
          
        } catch (error) {
        console.log(error);
        
        }
      };

      useEffect(() => {
        getAllOrders();
      }, []);

    return (
    <div>
        <h1>order</h1>
    </div>
  )
}

export default Order