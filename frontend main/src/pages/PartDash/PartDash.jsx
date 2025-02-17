import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setParts,
  addPart,
  updatePart,
  deletePart,
} from "../../Service/redux/reducers/PartDash/index";
import { apiClient } from "../../Service/api/api";
const PartDash = () => {
  const parts = useSelector((redusers) => redusers.partReduser.parts);
  const role = useSelector((redusers) => {
    console.log(redusers.authReducer);
    return redusers.authReducer.Role;
  });
  const token = useSelector((reduser) => reduser.authReducer.token);
  console.log(role);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [image, setImage] = useState("");
  const [editingPart, setEditingPart] = useState(null);
  const getAllParts = async () => {
    try {
      const result = await apiClient.part.getAllParts();
      dispatch(setParts(result.data.result));
      console.log(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddPart = async () => {
    const newPart = { title, price, service_id: serviceId, image };
    try {
      const result = await apiClient.parts.createNewPart(newPart, token);
      dispatch(addPart(result.data.result));
      setTitle("");
      setPrice("");
      setServiceId("");
      setImage("");
      getAllParts();
    } catch (error) {
      console.error("Add part error:", error);
    }
  };
  const handleUpdatePart = async (id) => {
    const updatedPart = { title, price, service_id: serviceId, image };
    try {
      const result = await apiClient.parts.updatePartById(
        id,
        updatedPart,
        token
      );
      dispatch(updatePart(result.data.result));
      setEditingPart(null);
      getAllParts();
    } catch (error) {
      console.error("updating part error:", error);
    }
  };
  const handleDeletePart = async (id) => {
    try {
      await apiClient.parts.deletePartById(id, token);
      dispatch(deletePart(id));
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
          <button onClick={handleAddPart}>Add Part</button>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            placeholder="Service ID"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
          />
          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      ) : null}
      {parts?.map((part) => (
        <div key={part.id}>
          <img src={part.image} alt={part.title} />
          <h5>{part.title}</h5>
          <p>Price: {part.price}</p>
          <p>Service ID: {part.service_id}</p>
          {role === "admin" && (
            <>
              {editingPart !== part.id ? (
                <button onClick={() => setEditingPart(part.id)}>Edit</button>
              ) : (
                <>
                  <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <input
                    placeholder="Service ID"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                  />
                  <input
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <button onClick={() => handleUpdatePart(part.id)}>
                    Save Update
                  </button>
                  <button onClick={() => setEditingPart(null)}>Cancel</button>
                </>
              )}
              <button onClick={() => handleDeletePart(part.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default PartDash;