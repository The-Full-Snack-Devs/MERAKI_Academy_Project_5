import React ,{useState,useContext} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
import { Card, CardContent, Typography, CardHeader, Divider,IconButton} from '@mui/material';
import { ThemeContext } from "../../components/MUI/MUITheme";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";


const JoinOurTeam = () => {
    const { darkMode } = useContext(ThemeContext);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleUpload = (e) => {
      console.log(e.target.files);
    };
  
  return (
    <div>
        <Card sx={{ maxWidth: 600, margin: '20px auto',mt:10, boxShadow:5 }}>
      <CardHeader title="Job Description" subheader="Mechanical Technician" />
      <Divider />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Job Title: Mechanical Technician
        </Typography>
        <Typography variant="body1" paragraph>
          As a Mechanical Technician, you will be responsible for maintaining, repairing, and improving
          mechanical systems and machinery. Your key duties will include performing routine inspections,
          troubleshooting mechanical issues, replacing defective parts, and ensuring the equipment is
          running at optimal performance.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Key Responsibilities:
        </Typography>
        <Box sx={{ paddingLeft: '20px' }}>
          <Typography variant="body1">- Conducting regular maintenance checks</Typography>
          <Typography variant="body1">- Repairing mechanical faults</Typography>
          <Typography variant="body1">- Replacing worn-out or damaged parts</Typography>
          <Typography variant="body1">- Collaborating with other technical teams</Typography>
        </Box>
        <Button fullWidth variant="outlined" color="primary" onClick={handleClickOpen}>
        Apply Now
      </Button>
      </CardContent>
    </Card>
        
      
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle 
      sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        backgroundColor: darkMode ? "#414141" : "#ffffff", 
        color: darkMode ? "#ffffff" : "#000000" ,
       marginBottom:2

      }}
    >
Apply for Mechanical Technician
      <IconButton onClick={() => setCartToggle(false)} sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
      
      </IconButton>
    </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '15px' }}
          />

          <Box sx={{ marginBottom: '15px' }}>
            <input
              accept=".pdf,.doc,.docx"
              type="file"
              id="upload-resume"
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="upload-resume">
              <Button variant="outlined" fullWidth component="span">
                Upload Resume
              </Button>
            </label>
          </Box>

          <Box sx={{ marginBottom: '15px' }}>
            <input
              accept=".pdf,.doc,.docx"
              type="file"
              id="upload-cover-letter"
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="upload-cover-letter">
              <Button variant="outlined" fullWidth component="span">
                Upload Cover Letter
              </Button>
            </label>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
             handleClose()
            alert(`Application submitted successfully!`)
            navigate("/")
            }} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default JoinOurTeam