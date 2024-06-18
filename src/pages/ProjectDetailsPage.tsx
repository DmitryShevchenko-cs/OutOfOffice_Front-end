import { useParams } from "react-router-dom";
import ProjectDetails from "../Components/DetailInfoComponents/ProjectDetails";

const ProjectDetailsPage: React.FC = () => {
    const { id } = useParams<string>();

    return (
        <>
            <ProjectDetails id={id!}  />
        </>
    );
};

export default ProjectDetailsPage;