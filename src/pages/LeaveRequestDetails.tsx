import { useParams } from "react-router-dom";
import LeaveRequestDetails from "../Components/DetailInfoComponents/LeaveRequestDetails";

const YourComponent: React.FC = () => {
    const { id } = useParams<{ id: string}>(); // Получаем id из параметров маршрута
    console.log(id)
    return (
        <>
            <LeaveRequestDetails id={String(id)}  />
        </>
    );
};

export default YourComponent;