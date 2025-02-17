import axios from "axios";
import Services from "../../pages/Services";
axios.defaults.baseURL = "http://localhost:5000"  ;
import { useSelector } from "react-redux";

  // const token = useSelector((reduser) => {reduser.authReducer.token})
   



const appendHeadrs = (token)=>{
  console.log(token);
  
    return {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
}


export const apiClient = {
  part: {
    getPartByServiceId: async (id, token) => {
      return await axios.get(`/part/service/${id}`, appendHeadrs(token));
    },
    getAllParts: async () => {
      return await axios.get(`/part/`);
    },
    updatePartById: async (idp, updatedPart) =>{
      return await axios.put(`/part/${idp}`, updatedPart);
    },
    createNewPart: async (newPart) => {
      console.log(newPart);
      return await axios.post(`/part/`, newPart);
    },
    deletePartById: async (idp) => {
      return await axios.delete(`/part/${idp}`);
    }
  },
  users:{
    login: async (newlogin) => {
        return await axios.post(`/users/login`, newlogin);
      },
    register: async (newUser) => {
        return await axios.post(`users/register`, newUser);
      }
  },
  cart:{
    getCartById: async (token) => {
        return await axios.get(`/services/getCart`, appendHeadrs(token));
      },
    getCartById2: async (token) => {
        return await axios.get(`/services/getCart2`, appendHeadrs(token));
      }

  },
  services:{
    getAllServices: async () => {
        return await axios.get(`/services/all`);
      },
      addNewServices:async (newServices,token)=>{
        return await axios.post(`/services/`,newServices,appendHeadrs(token))
      },
      update:async (id,servicesAfterUpdatte,token)=>{
        return await axios.put(`/services/${id}`,servicesAfterUpdatte,appendHeadrs(token))

      },
      delete: async (id,token)=>{
        return await axios.delete(`/services/${id}`,appendHeadrs(token))

      }
  },
  orders:{
    createOrder: async (newUser, token) => {
        return await axios.post(`/orders`, newUser, appendHeadrs(token));
      },
      getAllOrders: async (token) => {
        return await axios.get(`/orders`, appendHeadrs(token));
      },
  }
};