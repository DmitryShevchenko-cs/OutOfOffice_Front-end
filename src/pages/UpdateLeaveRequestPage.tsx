import { useParams } from "react-router-dom";
import UpdateLeaveRequestForm from "../Components/Forms/UpdateLeaveRequestForm";

const UpdateLeaveRequestPage: React.FC = () => {
    const { id } = useParams<string>(); // Получаем id из параметров маршрута

    return (
        <>
            <UpdateLeaveRequestForm id={id!}  />
        </>
    );
};

export default UpdateLeaveRequestPage;