import axios from "axios";
axios.defaults.baseURL = process.env.API_BASE_URL || "http://localhost:5000"  ;

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
