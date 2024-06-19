import { useParams } from "react-router-dom";
import EmployeeDetails from "../Components/DetailInfoComponents/EmployeeDetails";

const EmployeeDetailsPage: React.FC = () => {
    const { id } = useParams<string>(); 

    return (
        <>
            <EmployeeDetails id={id!}  />
        </>
    );
};

export default EmployeeDetailsPage;