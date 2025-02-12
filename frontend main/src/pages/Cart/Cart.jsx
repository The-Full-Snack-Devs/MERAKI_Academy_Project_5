import React,{ useEffect,useState } from 'react'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../Service/redux/reducers/cart";
import { useNavigate } from "react-router-dom";
import { apiClient } from '../../Service/api/api';

const Cart = () => {
  const navigate = useNavigate();
    const cart=useSelector((reduser)=>reduser.CartReduser.cart)
    const token=useSelector((reduser)=>reduser.authReducer.token)
    const dispatch = useDispatch();

    const [tPrice, settPrice] = useState(0)

const getCartById= async ()=>{
//     axios.get("http://localhost:5000/services/getCart", { headers })
//     .then((result)=>{
//         console.log(11);
//         console.log("jjjjjjjjjjj:",cart);
        
//         console.log(result.data.cart);
//         dispatch(setCart(result.data.cart));


//     })
//     .catch((error)=>{
// console.log(error);

//     })

try {
  const result = await apiClient.cart.getCartById(token)
  dispatch(setCart(result.data.cart));
} catch (error) {
  console.log(error);
}

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
          {settPrice(tPrice + ele.price)}
            </div>
        })}
        <p>total price: {tPrice}</p>
        <button onClick={()=>{navigate("/TL")}}>Place order..</button>
    </div>
  )
}

export default Cart