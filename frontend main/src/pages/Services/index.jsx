import React, { useEffect,useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setServices,addServices,updateServices,deleteServices } from "../../Service/redux/reducers/services";
import { useNavigate } from "react-router-dom";
import { apiClient } from '../../Service/api/api';


const Services = () => {
  const services = useSelector((redusers) => redusers.servicesReduser.services);
  const role = useSelector((redusers) => redusers.authReducer.Role);
  const token=useSelector((reduser)=>reduser.authReducer.token)

console.log(role);
const [name, setName] = useState("")
const [image, setImage] = useState("")
const [description, setDescription] = useState("")
const newService={name,image,description}
  
  const [openUpdate, setOpenUpdate] = useState(false)
  const servicesAfterUpdatte={name,description}

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllServices = async () => {
   

      try {
        const result = await apiClient.services.getAllServices()
        dispatch(setServices(result.data.servecies));
      } catch (error) {
        console.log(error);
      }

  };
  const addNewServices = async () => {
    
      try {
        const result = await apiClient.services.addNewServices(newService,token)
        console.log(result);
        
        dispatch(addServices(result.data.result));
        getAllServices();
        
      } catch (error) {
        console.log(error);
      }

  };
  const updateServicesById = async (id) => {
    console.log("idddddd:",id);
    
    try {
      const result = await apiClient.services.update(id,servicesAfterUpdatte,token)
      console.log(result);
      
      dispatch(updateServices(result.data.Servecies));
      getAllServices();
      
    } catch (error) {
      console.log(error);
    }

};
const upd

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div>
      {role==="Admin"&&<>
        <button onClick={addNewServices}>add</button>
      <input placeholder="name" value={services.name} onChange={(e)=>{
        setName(e.target.value)
      }}/>
      <input placeholder="description" onChange={(e)=>{
         setDescription(e.target.value)
      }}/>
      <input placeholder="image" onChange={(e)=>{
        setImage(e.target.value)
      }}/>
      </>}
      

      
      {services?.map((ele, i) => (
        <div>
          <img src={ele.image} />
          <p>{ele.name}</p>
          <p>{ele.description}</p>
          <button id={ele.id} 
          onClick={(e)=>navigate(`/DServices/${e.target.id}`)
        }
          >
            details
            {/* on click send the id whith navigate to component details*/}
          </button>
          {openUpdate !== ele.id && (
      <button onClick={() => setOpenUpdate(ele.id)}>update</button>
    )}
          
          {openUpdate === ele.id && (
      <>
<input placeholder="name" value={services.name} onChange={(e)=>{
        setName(e.target.value)
      }}/>  
            <input placeholder="description" onChange={(e) => setDescription(e.target.value)} />
        <button onClick={() => {
          setOpenUpdate(null)
          updateServicesById(ele.id)
          }}>save Update</button>
      </>
    )}
         
        </div>
      ))}
      
    </div>
  );
};

export default Services;
