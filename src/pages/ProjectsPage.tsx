import React, { useEffect, useState } from "react";
import ProjectTable from "../Components/Tables/ProjectTable";
import { Project } from "../types/Project";
import { useDeactivateProjectMutation, useGetAllProjetsQuery } from "../services/ProjectService";

const ProjectsPage = () => {

  const {data: projectsList } = useGetAllProjetsQuery(null);
  const [projects, setProjects] = useState<Project[]>([])

  const [deleteProject] = useDeactivateProjectMutation();

  useEffect(() => {
    if (projectsList) {
      setProjects(projectsList);
    }
  }, [projectsList]);

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id).unwrap();
    }catch (error: any) {
      console.error('Failed to approve request:', error.data || error.message);
    }
    window.location.reload();
  };
  
  return (
    <>
      <div>
        <h1>Projects Page</h1>
      </div>     
      <ProjectTable projects={projects} onDelete={handleDelete}/>
    </>
  );
};

export default ProjectsPage;
