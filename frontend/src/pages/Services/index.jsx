import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setServices, addServices, updateServices, deleteServices } from "../../Service/redux/reducers/services";
import { useNavigate } from "react-router-dom";
import { apiClient } from '../../Service/api/api';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, TextField, Card, CardContent, CardMedia, Grid, Typography, Container, Modal, Box } from "@mui/material";
import axios from "axios";

const Services = () => {
  const services = useSelector((state) => state.servicesReduser.services);
  const role = useSelector((state) => state.authReducer.Role);
  const token = useSelector((state) => state.authReducer.token);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadHandler = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "123abc");
    axios.post("https://api.cloudinary.com/v1_1/duxfa6nqg/upload", data)
      .then((res) => setImage(res.data.url))
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

  const addNewService = async () => {
    try {
      const newService = { name, image, description };
      const result = await apiClient.services.addNewServices(newService, token);
      dispatch(addServices(result.data.result));
      getAllServices();
      setOpenAddModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateServiceById = async (id) => {
    try {
      const result = await apiClient.services.update(id, { name, description }, token);
      dispatch(updateServices(result.data.Servecies));
      setOpenUpdateModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteServiceById = async (id) => {
    try {
      await apiClient.services.delete(id, token);
      dispatch(deleteServices(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

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

  return (
    <>
    <Box 
        sx={{
        mt: "60px",
          position: "relative",
          width: "100%",
          height: "50vh",
          backgroundImage: "url('src/assets/A_modern_car_repair_garage_with_an_orange_color_th.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: { xs: 2, md: 10 },
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            
          },
        }}
      >
        <Box sx={{ position: "relative", maxWidth: "600px" }}>
          <Typography variant="h2" fontWeight="bold">
            Our Services
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            "Your Car, Our Care – Anytime, Anywhere."
          </Typography>
        </Box>
      </Box>
    <Container sx={{ mt: 4 }}>
      {role === "admin" && (
        <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)} sx={{ mb: 4 }}>
          Add Service
        </Button>
      )}

      <Grid container spacing={3} sx={{mb: 5}}>
        {services?.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card sx={{ boxShadow: 5, transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
              <CardMedia component="img" height="200" image={service.image} alt={service.name} />
              <CardContent>
                <Typography variant="h5" component="div">{service.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{service.description}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate(`/DServices/${service.id}`)}>
                  Details
                </Button>
                {role === "admin" && (
                  <>
                    <Button variant="outlined" color="primary" sx={{ mt: 2, ml: 1 }} onClick={() => {
                      setSelectedService(service);
                      setName(service.name);
                      setDescription(service.description);
                      setOpenUpdateModal(true);
                    }}>
                      Update
                    </Button>
                    <Button variant="outlined" color="error" sx={{ mt: 2, ml: 1 }} onClick={() => deleteServiceById(service.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Service Modal */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>Add New Service</Typography>
          <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 2 }} />
          <Button component="label" fullWidth variant="outlined" startIcon={<CloudUploadIcon />}>Upload Image<input type="file" hidden onChange={(e) => uploadHandler(e.target.files[0])} /></Button>
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={addNewService}>Save</Button>
        </Box>
      </Modal>

      {/* Update Service Modal */}
      <Modal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>Update Service</Typography>
          <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => updateServiceById(selectedService.id)}>Save Update</Button>
        </Box>
      </Modal>
    </Container>
    <Box sx={{ bgcolor: "#f04f23", color: "white", py: 6, textAlign: "center", mt: 5 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold">🚨 Urgent Assistance</Typography>
          <Typography variant="body1" sx={{ mt: 2, maxWidth: "700px", mx: "auto" }}>
            Need immediate roadside assistance? Contact us now for fast and reliable help!
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3, flexWrap: "wrap" }}>
            <Button variant="contained" color="primary" href="tel:+9627XXXXXXXX" sx={{ fontSize: "1rem" }}>
              📞 Call Now
            </Button>
            <Button variant="contained" color="secondary" href="mailto:support@mech2u.com" sx={{ fontSize: "1rem" }}>
              📧 Email Us
            </Button>
            <Button variant="outlined" color="inherit" onClick={() => navigate("/contact")}
              sx={{ fontSize: "1rem", borderColor: "white", color: "white", '&:hover': { bgcolor: "white", color: "black" } }}>
              📍 Contact Us Page
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Services;
