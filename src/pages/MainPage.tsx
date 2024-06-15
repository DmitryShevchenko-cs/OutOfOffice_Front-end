import React from "react";
import { useGetCurrentUserQuery } from "../services/UserService";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const MainPage = () => {
  
  const {data: user} = useGetCurrentUserQuery(null);
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
    </div>
  );
};

export default MainPage;
