import React,{ useEffect } from 'react'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from '../redux/reducers/cart';
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const navigate = useNavigate();
    const cart=useSelector((reduser)=>reduser.CartReduser.cart)
    const token=useSelector((reduser)=>reduser.authReducer.token)
    console.log("1111111111111111111",token);
    
    const headers = {
        Authorization: `Bearer ${token}`,
      };
    const dispatch = useDispatch();

    const getCartById=()=>{
    axios.get("http://localhost:5000/services/getCart", { headers })
    .then((result)=>{
        console.log(11);
        console.log("jjjjjjjjjjj:",cart);
        
        console.log(result.data.cart);
        dispatch(setCart(result.data.cart));


    })
    .catch((error)=>{
console.log(error);

    })

}
useEffect(() => {
    getCartById();
  }, []);

  return (
    <div>
        {cart?.map((ele,ind)=>{
            return <div>
                 <img src={ele.image} />
          <p>{ele.name}</p>
          <p>{ele.description}</p>
          <p>{ele.price}</p>
            </div>
        })}
        <button onClick={()=>{navigate("/TL")}}>Place order..</button>
    </div>
  )
}

export default Cart