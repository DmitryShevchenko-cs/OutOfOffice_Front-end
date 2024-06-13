import React from "react";
import { useGetCurrentUserQuery } from "../services/UserService";

const MainPage = () => {
  
  const {data: user} = useGetCurrentUserQuery(null);

  return (
    <div>
      <h1>{user?.fullName}</h1>
      {user?.photo ? (
        <img src={`data:image/jpeg;base64,${user.photo}`} alt={`${user.fullName}'s photo`} />
      ) : (
        <p>No photo available</p>
      )}
      <p>User Type: {user?.userType}</p>
    </div>
  );
};

export default MainPage;
