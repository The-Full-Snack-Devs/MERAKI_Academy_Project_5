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
    getAllParts: async () => {
      return await axios.get(`/part`);
    },
    updatePartById: async (id, updatedPart) =>{
      return await axios.put(`/part/${id}`, updatedPart);

    },
    createNewPart: async (x, token) => {
      return await axios.post(`/part`,x, appendHeadrs(token));
    },

    deletePartById: async (id) => {
      return await axios.delete(`/part/${id}`);
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
    getCartById2: async (id, token) => {
        return await axios.get(`/services/getCartById2/${id}`, appendHeadrs(token));
      },
    removeFromCart: async (id, token) => {
      return await axios.delete(`/services/removeFromCart/${id}`, appendHeadrs(token));
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
      confirmOrder: async (id,body,token) => {
        return await axios.put(`/orders/${id}`, body, appendHeadrs(token));
      },
      confirmOrderEmp: async (id,body,token) => {
        return await axios.put(`/orders/emp/${id}`, body, appendHeadrs(token));
      },
  },
  profile:{
      GetProfile:async (token)=>{
        return await axios.get(`/users/profile`,appendHeadrs(token))
  },
  getOrderById:async (token)=>{
    return await axios.get(`/orders/all`,appendHeadrs(token))
  },
},

getProfileTeam:async(token)=>{
  return await axios.get(`/users/team`,appendHeadrs(token))

},
getOrderByTeam:async(id,token)=>{
  return await axios.get(`/orders/team/${id}`,appendHeadrs(token))

},

}
}
