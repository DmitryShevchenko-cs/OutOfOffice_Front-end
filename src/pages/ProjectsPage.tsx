import React, { useEffect, useState } from "react";
import ProjectTable from "../Components/ProjectTable";
import { Project } from "../types/Project";
import { useGetAllProjetsQuery } from "../services/ProjectService";

const ProjectsPage = () => {

  const {data: projectsList } = useGetAllProjetsQuery(null);

  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    if (projectsList) {
      setProjects(projectsList);
    }
  }, [projectsList]);

  const handleEdit = (id: number) => {
    // Реализация редактирования
    
  };

  const handleDelete = (id: number) => {
    // Реализация удаления
    setProjects(projects.filter((project) => project.id !== id));
  };
  
  return (
    <>
      <div>
        <h1>Projects Page</h1>
      </div>     
      <ProjectTable projects={projects} onEdit={handleEdit} onDelete={handleDelete}/>
    </>
  );
};

export default ProjectsPage;
