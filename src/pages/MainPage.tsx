import React from "react";
import { useGetCurrentUserQuery } from "../services/UserService";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const MainPage = () => {

  const { data: user } = useGetCurrentUserQuery(null);
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <div>
      <h1>{user?.fullName}</h1>
      {user?.photo ? (
        <img src={`data:image/jpeg;base64,${user.photo}`} alt={`${user.fullName}'s photo`} />
      ) : (
        <p>No photo available</p>
      )}
      <p>User Type: {role}</p>
      <Button
        component={Link}
        to="/create-user"
        variant="contained"
        color="primary"
      >
        Create user
      </Button>
    </div>
  );
};

export default MainPage;
