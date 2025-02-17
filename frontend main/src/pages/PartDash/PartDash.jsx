import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {setParts,addPart,updatePart,deletePart} from "../../Service/redux/reducers/PartDash/index";
import { apiClient } from "../../Service/api/api";
import { useNavigate } from "react-router-dom";


const PartDash = () => {
  const parts = useSelector((redusers) => redusers.partReduser.parts);
  const role = useSelector((redusers) =>  redusers.authReducer.Role);
  const token = useSelector((reduser) => reduser.authReducer.token);

  console.log(role);
  const dispatch = useDispatch();
  const [namep, setnamep] = useState("");
  const [price, setPrice] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [imagep, setImagep] = useState("");
  const [editingPart, setEditingPart] = useState(null);

    const navigate = useNavigate();


  const getAllParts = async () => {
    try {
      const result = await apiClient.part.getAllParts();
      
      dispatch(setParts(result.data.result));
    } catch (error) {
      console.log(error);
      
    }
  };
  const handleAddPart = async () => {
    console.log("test");

    const newPart = { namep, price, service_id : serviceId, imagep };
    try {
      const result = await apiClient.part.createNewPart(newPart);
      console.log("test");
      
      dispatch(addPart(result.data.result));
      setnamep("");
      setPrice("");
      setServiceId("");
      setImagep("");
      getAllParts();
    } catch (error) {
      console.log(error);
      
      console.error("Add part error:", error);
      console.log("test");
      
    }
  };
  const handleUpdatePart = async (idp) => {
    
    const updatedPart = { namep, price, service_id: serviceId, imagep };
    try {
      const result = await apiClient.part.updatePartById(
        idp,
        updatedPart,
        token,
      );
      dispatch(updatePart(result.data.result));
      setEditingPart(null);
      getAllParts();
    } catch (error) {
      console.error("updating part error:", error);
    }
  };
  const handleDeletePart = async (idp) => {
    try {
      await apiClient.part.deletePartById(idp);
      dispatch(deletePart(idp));
      getAllParts();
    } catch (error) {
      console.error("deleting part error:", error);
    }
  };
  useEffect(() => {
    getAllParts();
  }, []);
  // {con ? (exu) : (exu)}
  return (
    <div>
      <h2>Part Dashboard</h2>
      {role === "admin" ? (
        <div>
          <button onClick ={handleAddPart}>Add Part</button>
          <input
            placeholder="namep"
            value={namep}
            onChange={(e) => setnamep(e.target.value)}
          />
          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <input
            placeholder="Service ID"
            value={serviceId}
            onChange={(e) => setServiceId(Number(e.target.value))}
          />
          <input
            placeholder="Image URL"
            value={imagep}
            onChange={(e) => setImagep(e.target.value)}
          />
        </div>
      ) : null}
      {parts?.map((part) => (
        <div key={part.idp || part.namep || part.service_id}>
          <img src={part.imagep} alt={part.namep} />
          <h5>{part.namep}</h5>
          <p>Price: {part.price}</p>
          <p>Service ID: {part.service_id}</p>
          {role === "admin" && (
            <>
              {editingPart !== part.idp ? (
                <button onClick={() => setEditingPart(part.idp)}>Edit</button>
              ) : (
                <>
                  <input
                    placeholder="namep"
                    value={namep}
                    onChange={(e) => setnamep(e.target.value)}
                  />
                  <input
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                  <input
                    placeholder="Service ID"
                    value={serviceId}
                    onChange={(e) => setServiceId(Number(e.target.value))}
                  />
                  <input
                    placeholder="Image URL"
                    value={imagep}
                    onChange={(e) => setImagep(e.target.value)}
                  />
                  <button onClick={() => handleUpdatePart(part.idp)}>
                    Save Update
                  </button>
                  <button onClick={() => setEditingPart(null)}>Cancel</button>
                </>
              )}
              <button onClick={() => handleDeletePart(part.idp)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default PartDash;






