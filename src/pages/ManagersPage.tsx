import React, { useEffect, useState } from "react";
import { useDelManagerMutation, useGetAllManagersQuery } from "../services/ManagerService";
import { BaseManager } from "../types/Emloyees";
import ManagersTable from "../Components/Tables/ManagersTable";

const ManagersPage = () => {

  const {data: managersList } = useGetAllManagersQuery(null);
  const [managers, setManagers] = useState<BaseManager[]>([])
  
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
      <ManagersTable managers={managers} onDelete={handleDelete}/>
    </>
  );
};

export default ManagersPage;
