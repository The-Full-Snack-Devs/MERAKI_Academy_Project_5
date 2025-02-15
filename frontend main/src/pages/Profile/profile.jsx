import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiClient } from '../../Service/api/api';
import { setProfile } from '../../Service/redux/reducers/Profile';

// Material UI Components
import { Container, Card, CardContent, Avatar, Typography, Box ,Button } from "@mui/material";

const Profile = () => {
  const profile = useSelector((state) => state.profileReduser.profile);
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();

  const getProfileById = async () => {
    try {
      const result = await apiClient.profile.GetProfile(token);
      dispatch(setProfile(result.data.User));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getProfileById();
  }, []);

  return (
    <Container sx={{ marginTop: 10 }}>
      <Card sx={{ maxWidth: 500, margin: "auto", padding: 3, textAlign: "center" ,boxShadow:8 }}>
        <CardContent>
          <Avatar
            src={profile.image}
            alt={`${profile.firstname} ${profile.lastname}`}
            sx={{ width: 200, height: 200, margin: "auto", marginBottom: 2 }}
          />

        
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            {profile.firstname} {profile.lastname}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
            {profile.email}
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Phone: {profile.phone}
          </Typography>

          <Box sx={{ marginTop: 3 }}>
            <Button variant="contained" color="primary">
              تعديل البروفايل
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;