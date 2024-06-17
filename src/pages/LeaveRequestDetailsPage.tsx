import { useParams } from "react-router-dom";
import LeaveRequestDetails from "../Components/DetailInfoComponents/LeaveRequestDetails";

const LeaveRequestDetailsPage: React.FC = () => {
    const { id } = useParams<string>(); // Получаем id из параметров маршрута

    return (
        <>
            <LeaveRequestDetails id={id!}  />
        </>
    );
};

export default LeaveRequestDetailsPage;