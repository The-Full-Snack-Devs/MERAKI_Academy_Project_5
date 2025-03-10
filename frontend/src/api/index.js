import axios from "axios";
axios.defaults.baseURL = process.env.API_BASE_URL || "https://mech2u.onrender.com"  ;

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
    
  },
};
