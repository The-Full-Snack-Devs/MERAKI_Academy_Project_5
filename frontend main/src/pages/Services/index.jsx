import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setServices, addServices, updateServices, deleteServices } from "../../Service/redux/reducers/services";
import { useNavigate } from "react-router-dom";
import { apiClient } from '../../Service/api/api';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// Material UI Components
import { Button, TextField, Card, CardContent, CardMedia, Grid, Typography, Container, Modal, Box } from "@mui/material";
import axios from "axios"
const Services = () => {
  const services = useSelector((redusers) => redusers.servicesReduser.services);
  const role = useSelector((redusers) => redusers.authReducer.Role);
  const token = useSelector((reduser) => reduser.authReducer.token);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const newService = { name, image, description };

  const [openUpdateModal, setOpenUpdateModal] = useState(false); // State for Update Modal
  const [selectedService, setSelectedService] = useState(null); // State to store the selected service for update
  const [openAddModal, setOpenAddModal] = useState(false); // State for Add Modal

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uploadHandler = (x) => {
    console.log(x);
    
    const data = new FormData();
    data.append("file", x);
    data.append("upload_preset", "123abc");

    axios.post("https://api.cloudinary.com/v1_1/duxfa6nqg/upload", data)
      .then((rese) => setImage(rese.data.url) )
      .catch((err) => console.log(err.response?.data));
  };

  const getAllServices = async () => {
    try {
      const result = await apiClient.services.getAllServices();
      dispatch(setServices(result.data.servecies));
    } catch (error) {
      console.log(error);
    }
  };

  const addNewServices = async () => {
    try {
      const result = await apiClient.services.addNewServices(newService, token);
      dispatch(addServices(result.data.result));
      getAllServices();
      setOpenAddModal(false); // Close modal after adding
    } catch (error) {
      console.log(error);
    }
  };

  const updateServicesById = async (id) => {
    try {
      const result = await apiClient.services.update(id, { name, description }, token);
      dispatch(updateServices(result.data.Servecies));
      setOpenUpdateModal(false); // Close modal after updating
    } catch (error) {
      console.log(error);
    }
  };

  const deleteServicesById = async (id) => {
    try {
      const result = await apiClient.services.delete(id, token);
      dispatch(deleteServices(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  // Style for the Modal
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  const cardStyle = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow:5,
    "&:hover": {
      transform: "scale(1.05)", // Slightly scale up the card
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Add a shadow
    },
  };

  return (
    <Container sx={{mt:8}}>
      
      {role === "admin" && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenAddModal(true)}
          sx={{ marginBottom: 4 }}
        >
          Add Service
        </Button>
      )}

      {/* Add Service Modal */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        aria-labelledby="add-service-modal"
        aria-describedby="add-service-form"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Add New Service
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
            Upload Image
            <input type="file" hidden onChange={(e) => uploadHandler(e.target.files[0])} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={addNewServices}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* Update Service Modal */}
      <Modal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        aria-labelledby="update-service-modal"
        aria-describedby="update-service-form"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Update Service
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateServicesById(selectedService.id)}
          >
            Save Update
          </Button>
        </Box>
      </Modal>

      <Grid container spacing={3}>
        {services?.map((ele, i) => (
          <Grid item xs={12} sm={6} md={4} key={ele.id}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                height="140"
                image={ele.image}
                alt={ele.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {ele.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ele.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ marginTop: 2, marginRight: 1 }}
                  onClick={() => navigate(`/DServices/${ele.id}`)}
                >
                  Details
                </Button>

                {role === "admin" && (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ marginTop: 2, marginRight: 1 }}
                      onClick={() => {
                        setSelectedService(ele); // Set the selected service
                        setName(ele.name); // Pre-fill the name
                        setDescription(ele.description); // Pre-fill the description
                        setOpenUpdateModal(true); // Open the update modal
                      }}
                    >
                      Update
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ marginTop: 2 }}
                      onClick={() => deleteServicesById(ele.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;