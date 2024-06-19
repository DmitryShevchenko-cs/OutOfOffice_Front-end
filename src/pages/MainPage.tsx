import React from "react";
import { useGetCurrentUserQuery } from "../services/UserService";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { UserType } from "../types/User";
import { Link } from "react-router-dom";

const MainPage = () => {

  const { data: user } = useGetCurrentUserQuery(null);
  const role = useSelector((state: RootState) => state.auth.role);


  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {user?.fullName}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          User Type: {role}
        </Typography>
      </Box>
      <Grid container spacing={2} >
        {(role === UserType.Admin || role === UserType.HrManager) && (
          <>
            <Grid item>
              <Button
                component={Link}
                to="/create-absence-reason"
                variant="contained"
                color="primary"
              >
                Create absence reason
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/create-subdivision"
                variant="contained"
                color="primary"
              >
                Create subdivision
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/create-position"
                variant="contained"
                color="primary"
              >
                Create position
              </Button>
            </Grid>
          </>
        )}
        {(role === UserType.Admin || role === UserType.ProjectManager) && (
          <Grid item>
            <Button
              component={Link}
              to="/create-project-type"
              variant="contained"
              color="primary"
            >
              Create project type
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default MainPage;
