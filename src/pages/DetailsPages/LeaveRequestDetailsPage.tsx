import { useParams } from "react-router-dom";
import LeaveRequestDetails from "../../Components/DetailInfoComponents/LeaveRequestDetails";

const LeaveRequestDetailsPage: React.FC = () => {
    const { id } = useParams<string>(); 

    return (
        <>
            <LeaveRequestDetails id={id!}  />
        </>
    );
};

export default LeaveRequestDetailsPage;