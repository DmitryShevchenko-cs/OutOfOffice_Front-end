import { useParams } from "react-router-dom";
import UpdateProjectForm from "../Components/Forms/UpdateProjectForm";

const UpdateLeaveRequestPage: React.FC = () => {
    const { id } = useParams<string>(); // Получаем id из параметров маршрута

    return (
        <>
            <UpdateProjectForm id={id!}  />
        </>
    );
};

export default UpdateLeaveRequestPage;