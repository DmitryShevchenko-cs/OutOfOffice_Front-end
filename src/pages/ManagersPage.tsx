import React, { useEffect, useState } from "react";
import { useDelManagerMutation, useGetAllManagersQuery } from "../services/ManagerService";
import { BaseManager } from "../types/Emloyees";
import ManagersTable from "../Components/Tables/ManagersTable";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserType } from "../types/User";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ManagersPage = () => {

  const {data: managersList } = useGetAllManagersQuery(null);
  const [managers, setManagers] = useState<BaseManager[]>([])
  const role = useSelector((state: RootState) => state.auth.role);
  const [deleteProject] = useDelManagerMutation();

  useEffect(() => {
    if (managersList) {
      setManagers(managersList);
    }
  }, [managersList]);

  const handleDelete = async (id: number) => {
    try{
      setManagers(managers.filter((manager) => manager.id !== id));
      await deleteProject(id).unwrap();
    }catch (error: any) {
      console.error('Failed to approve request:', error.data || error.message);
    }
  };

  return (
    <>
      <div>
        <h1>Managers Page</h1>
      </div>     
      {(role === UserType.Admin || role === UserType.HrManager) && (
        <Button
          component={Link}
          to="/create-manager"
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
        >
          Create manager
        </Button>
      )}
      <ManagersTable managers={managers} onDelete={handleDelete}/>
    </>
  );
};

export default ManagersPage;
