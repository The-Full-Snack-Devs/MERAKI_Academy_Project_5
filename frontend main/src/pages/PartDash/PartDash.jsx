import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setParts, addPart, updatePart, deletePart } from "../../Service/redux/reducers/PartDash/index";
import { apiClient } from "../../Service/api/api";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent,Box, DialogActions, TextField, IconButton, Container } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PartDash = () => {
  const parts = useSelector((state) => state.partReduser.parts);
  const role = useSelector((state) => state.authReducer.Role);
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [partData, setPartData] = useState({ namep: "", price: "", serviceId: "", imagep: "" });

  const getAllParts = async () => {
    try {
      const result = await apiClient.part.getAllParts();
      dispatch(setParts(result.data.result));
    } catch (error) {
      console.log(error);
    }
  };

  const uploadHandler = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "123abc");
    axios.post("https://api.cloudinary.com/v1_1/duxfa6nqg/upload", data)
      .then((res) =>{ 
        console.log(res.data.url);
        setPartData({ ...partData, imagep: res.data.url })})
      .catch((err) => console.log(err.response?.data));
  };

  useEffect(() => {
    getAllParts();
  }, []);

  const handleSave = async () => {
    try {
      if (editingPart) {
        await apiClient.part.updatePartById(editingPart, partData);
        dispatch(updatePart(partData));
      } else {
        await apiClient.part.createNewPart(partData, token);
        dispatch(addPart(partData));
      }
      setOpenModal(false);
      setEditingPart(null);
      getAllParts();
    } catch (error) {
      console.error("Error saving part:", error);
    }
  };

  return (
    <Container  sx={{ mt: 10 }}>

      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Add New Part
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Service ID</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              {role === "admin" && <StyledTableCell>Actions</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {parts.map((part) => (
              <StyledTableRow key={part.idp}>
                <StyledTableCell>{part.idp}</StyledTableCell>
                <StyledTableCell>{part.namep}</StyledTableCell>
                <StyledTableCell>{part.price}</StyledTableCell>
                <StyledTableCell>{part.service_id}</StyledTableCell>
                <StyledTableCell>
                  <img src={part.imagep} alt={part.namep} width={50} height={50} />
                </StyledTableCell>
                {role === "admin" && (
                  <StyledTableCell sx={{display:"flex", gap:2}}>
                    <Button variant="outlined" onClick={() => { setEditingPart(part.idp); setPartData(part); setOpenModal(true); }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={async () => {
                      await apiClient.part.deletePartById(part.idp);
                      dispatch(deletePart(part.idp));
                      getAllParts();
                    }}>
                      Delete
                    </Button>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>
          {editingPart ? "Edit Part" : "Add New Part"}
          <IconButton onClick={() => setOpenModal(false)} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" value={partData.namep} onChange={(e) => setPartData({ ...partData, namep: e.target.value })} />
          <TextField fullWidth margin="dense" label="Price" type="number" value={partData.price} onChange={(e) => setPartData({ ...partData, price: e.target.value })} />
          <TextField fullWidth margin="dense" label="Service ID" value={partData.serviceId} onChange={(e) => setPartData({ ...partData, serviceId: e.target.value })} />
          <Button fullWidth component="label" variant="outlined" startIcon={<CloudUploadIcon />}>Upload Image<input type="file" hidden onChange={(e) => uploadHandler(e.target.files[0])} /></Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={()=>{handleSave()}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PartDash;
