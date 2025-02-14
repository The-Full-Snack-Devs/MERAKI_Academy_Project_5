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
    },getAllParts: async (token) => {
      return await axios.get(`/part` , appendHeadrs(token));
    },
    updatePartById: async (id, token) =>{
      return await axios.get(`/part/${id}` , appendHeadrs(token));
    },
    createNewPart: async (token) => {
      return await axios.get(`/part`, appendHeadrs(token));
    },
    deletePartById: async (id, token) => {
      return await axios.get(`/part/${id}`, appendHeadrs(token));
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
  },
  profile:{
    GetProfile:async (token)=>{
    return await axios.get(`/users/profile`,appendHeadrs(token))
  }}
};