import axios from "axios";
import Services from "../../pages/Services";
axios.defaults.baseURL = "http://localhost:5000"  ;

const appendHeadrs = (token)=>{
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
  },
  services:{
    getAllServices: async () => {
        return await axios.get(`/services/all`);
      },
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